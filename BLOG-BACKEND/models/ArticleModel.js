//AricleModel.js

import { Schema,Types,model } from "mongoose";

const commentSchema=new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"User ID required"]
    },
    comment:{
        type:String,
        required:[true,"end"]
    }
})

const articleSchema=new Schema({
    author:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"Author ID is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    content:{ //{comment:"",username:""}
        type:String,
        required:[true,"Content is required"]
    },
    comments:[{type:commentSchema,default:[]}],

    isArticleActive:{
        type:Boolean,
        default:true
    }
},
{
    versionKey:false,
    timestamps:true,
    strict:"throw"
})

//create article model
export const ArticleModel=model("article",articleSchema)