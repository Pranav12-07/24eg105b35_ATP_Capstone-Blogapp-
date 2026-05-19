//UserAPI.js


import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
export const userApp=exp.Router()

//read articles of all authors
userApp.get('/articles',verifyToken("USER"),async(req,res,next) => {
    try {
    //read articles
    const articleList=await ArticleModel.find({isArticleActive:true}).populate("author","firstName lastName email profileImageUrl")
    //send res
    res.status(200).json({message:"Articles:",payload:articleList})
    } catch (err) {
        next(err)
    }
})

//read one active article by id
userApp.get('/article/:articleId',verifyToken("USER","AUTHOR","ADMIN"),async(req,res,next) => {
    try {
    const articleDoc=await ArticleModel.findOne({_id:req.params.articleId,isArticleActive:true})
        .populate("author","firstName lastName email profileImageUrl")
        .populate("comments.user","firstName lastName email profileImageUrl")
    if(!articleDoc)
        return res.status(404).json({message:"Article not found"})
    res.status(200).json({message:"Article:",payload:articleDoc})
    } catch (err) {
        next(err)
    }
})

//add comment to an article
userApp.put('/articles',verifyToken("USER"),async(req,res,next) => {
    try {
    //get body from req
    const {articleId,comment}=req.body
    //check article
    const articleDoc=await ArticleModel.findOne({_id:articleId,isArticleActive:true})
    //if article not found
    if(!articleDoc)
        return res.status(404).json({message:"Article not found"})
    //get user id
    const userId=req.user?.id
    //add comment to comments array of article documment
    articleDoc.comments.push({user:userId,comment:comment})
    //save
    await articleDoc.save()
    await articleDoc.populate("comments.user","firstName lastName email profileImageUrl")
    //send res
    res.status(200).json({message:"Comment added successfully",payload:articleDoc})
    } catch (err) {
        next(err)
    }
})
