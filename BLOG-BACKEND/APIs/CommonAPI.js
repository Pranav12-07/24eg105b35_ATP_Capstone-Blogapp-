//CommonAPI.js

import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { hash,compare } from 'bcryptjs'
import { config } from 'dotenv'
import { verifyToken } from '../middlewares/verifyToken.js'
import jwt from 'jsonwebtoken'
import { upload } from '../config/multer.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js'
import cloudinary from '../config/cloudinary.js'
config()
const {sign}=jwt
export const commonApp=exp.Router()

//route for registration
commonApp.post('/users',upload.single("profileImageUrl"),async(req,res,next) =>{
    let cloudinaryResult;
    try {
        let allowedRoles=["USER","AUTHOR"]
        //get user from req
        const newUser=req.body
        console.log(newUser);
        console.log(req.file);
        //check the role
        if(!allowedRoles.includes(newUser.role))
            return res.status(400).json({message:"Invalid role"})
        
        //Upload image to cloudinary from memoryStorage
        if (req.file) {
            cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        }

        //add CDN link(secure_url) of image to newUserObj
        newUser.profileImageUrl = cloudinaryResult?.secure_url;

        //run validators 
        
        //hash password adn replace plain with hashed one
        newUser.password=await hash(newUser.password,12)
        //create new user document
        const newUserDoc=new UserModel(newUser)
        //save document
        await newUserDoc.save() //validators will run only when we call save()
        //send res
        res.status(201).json({message:"user created"})
    } catch (err) {
        console.log("err is ", err);
        //delete image from cloudinary
        if (cloudinaryResult?.public_id) {
            await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        }
        next(err);
    }
})

const loginHandler=async(req,res,next) => {
    try {
    //get user credential obj
    const {email,password}=req.body
    //find user by email
    const user=await UserModel.findOne({email:email})
    //if user not found
    if(!user)
        return res.status(400).json({message:"Invalid email"})
    //compare password
    const isMatched=await compare(password,user.password)
    //password not matched
    if(!isMatched)
        return res.status(400).json({message:"Invalid password"})
    if(!user.isUserActive)
        return res.status(403).json({message:"Your account is blocked"})
    //create jwt
    const signedToken=sign({id:user._id, email:email, role:user.role},process.env.SECRET_KEY,{expiresIn:"1hr"})
    //set token to res header as httpOnly
    res.cookie("token",signedToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    //remove password from user document
    //convert documnet into js obj
    const userObj=user.toObject()
    delete userObj.password
    //send res
    res.status(200).json({message:"Login successful",payload:userObj,token:signedToken})
    } catch (err) {
        next(err)
    }
}

//route for login(user,author,admin)
commonApp.post('/login',loginHandler)
commonApp.post('/login/users',loginHandler)

//route for logout
commonApp.get('/logout', (req,res) => {
    //delete token from cookie storage
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    //send res
    res.status(200).json({message:"Logout successful"})
})

//Page refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user,
  });
})

//route for changing password
commonApp.put('/password',verifyToken("USER","AUTHOR","ADMIN"),async(req,res,next) => {
    try {
    //get current pass and new pass from req
    const {currentPassword,newPassword}=req.body
    //check current password and new password are same
    if(currentPassword===newPassword)
        return res.status(400).json({message:"New password cannot be same as current password"})
    //get user id from token
    const userId=req.user?.id
    //get user from db
    const user=await UserModel.findById(userId)
    //get current password of user/admin/author
    //compare password
    const isMatched=await compare(currentPassword,user.password)
    //if not matched
    if(!isMatched)
        return res.status(400).json({message:"Current password is not correct"})
    //hash new password
    const newPassObj=await hash(newPassword,12)
    //replace current password of user with hashed new password
    await UserModel.findOneAndUpdate({_id:userId},{$set:{password:newPassObj}})
    //send res
    res.status(200).json({message:"Password updated successfully"})
    } catch (err) {
        next(err)
    }
})
