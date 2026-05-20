//server.js

import exp from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './APIs/UserAPI.js'
import { authorApp } from './APIs/AuthorAPI.js'
import { adminApp } from './APIs/AdminAPI.js'
import { commonApp }  from './APIs/CommonAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { hash } from 'bcryptjs'
import { UserModel } from './models/UserModel.js'
config()
//create express app
const app=exp()

const seedDefaultAdmin = async() => {
    const adminEmail=process.env.ADMIN_EMAIL || "admin@email.com"
    const adminPassword=process.env.ADMIN_PASSWORD || "admin"
    const admin=await UserModel.findOne({email:adminEmail})
    const hashedPassword=await hash(adminPassword,12)

    if(admin) {
        admin.password=hashedPassword
        admin.role="ADMIN"
        admin.isUserActive=true
        await admin.save()
        console.log(`Default admin ready: ${adminEmail}`)
        return
    }

    await UserModel.create({
        firstName:"Admin",
        lastName:"",
        email:adminEmail,
        password:hashedPassword,
        role:"ADMIN"
    })
    console.log(`Default admin seeded: ${adminEmail}`)
}

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:3000",
    "http://localhost:4173",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:4173",
    "http://127.0.0.1:5173",
	"https://24eg105b35-atp-capstone-blogapp.vercel.app",
].filter(Boolean)

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

//add body parser
app.use(exp.json())
app.use(cookieParser())

//path level middlewares
app.use("/user-api",userApp)
app.use("/author-api",authorApp)
app.use("/admin-api",adminApp)
app.use("/auth",commonApp)

//connect to db
const connectDB= async() => {
    try{
        await connect(process.env.DB_URL)
        console.log("DB connected")
        await seedDefaultAdmin()
        //assign port
        const port=process.env.PORT
        app.listen(port,() => console.log(`server listening to ${port}...`))
    }catch(err){
        console.log("err in db connect",err)
    }
}

connectDB()


//to handle invalid path
app.use((req,res,next) => {
    console.log(req.url)
    res.status(404).json({message:`path ${req.url} is invalid`})
})

//to handle errors
app.use((err,req,res,next) => {
	console.log(err.name, err.message)
	if (err.name === "ValidationError") 
		return res.status(400).json({ message: "error occured", error: err.message })
	if (err.name === "CastError") 
		return res.status(400).json({ message: "error occured", error: err.message })
	//server error
	res.status(500).json({ message: "error occured", error: "server side error" })
})
