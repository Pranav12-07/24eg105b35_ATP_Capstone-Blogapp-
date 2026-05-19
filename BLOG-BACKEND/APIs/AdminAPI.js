//AdminAPI.js

import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const adminApp=exp.Router()

//read all users and authors
adminApp.get('/users',verifyToken("ADMIN"),async(req,res,next) => {
    try {
    //read all users
    const usersList=await UserModel.find()
    //send res
    res.status(200).json({message:"Users",payload:usersList})
    } catch (err) {
        next(err)
    }
})

//block or activate user or author
adminApp.patch('/users',verifyToken("ADMIN"),async(req,res,next) => {
    try {
    //get userId and isUserActive from req
    const {userId,isUserActive}=req.body
    //update the user status
    const updatedUser=await UserModel.findOneAndUpdate(
        {_id:userId},
        {$set:{isUserActive:isUserActive}},
        {new:true}
    )
    //if user not found
    if(!updatedUser)
        return res.status(404).json({message:"User not found"})
    //send res
    res.status(200).json({message:"User status updated",payload:updatedUser})
    } catch (err) {
        next(err)
    }
})
