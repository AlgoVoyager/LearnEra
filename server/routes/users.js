import { Router } from "express";
const userRouter = Router();
import z from "zod";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { userModel } from "../models/db.js";
import 'dotenv/config'
import {userMiddleware,authicateUser} from "../middlewares/user.js"


userRouter.post('/signup', async (req, res) => {
    const signupSchema = z.object({
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
        email: z.email(),
        password: z.string().min(6).refine((p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p), {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
    });

    const parsedBody = signupSchema.safeParse(req.body);
    if (!parsedBody.success) {
        const errorCause = JSON.parse(parsedBody.error.message)[0]
        return res.status(400).json({
            message:`${errorCause.path[0]} - ${errorCause.message}`
        })
    }
    const { firstName, lastName, email, password } = parsedBody.data;
    try{
        const user = await userModel.findOne({email});
        if(user){
            return res.status(409).json({
                message:"Email already exists!"
            })
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        await userModel.create({
            email,
            password:hashedPassword,
            firstName,
            lastName
        })
        res.json({
            message:"User Created Succesfully"
        })

    }catch(error){
        res.status(501).json({message:"Internal server error!"})
        console.log(error)
    }
})
userRouter.post('/signin', async (req, res) => {
    const signinSchema = z.object({
        email: z.email(),
        password: z.string().min(6).refine((p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p), {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
    })
    const parsedBody = signinSchema.safeParse(req.body);
    if (!parsedBody.success) {
        const errorCause = JSON.parse(parsedBody.error.message)[0]
        return res.status(400).json({
            message:`${errorCause.path[0]} - ${errorCause.message}`
        })
    }
    const { email, password } = parsedBody.data;
    try{
        const user = await userModel.findOne({email});
        if(!user)
            return res.status(401).json({message:"Email not found!"});
        const matchPassword = await bcryptjs.compare(password,user.password);
        if(!matchPassword)
            return res.status(401).json({message:"Incorrect Password!"});
        const token = jwt.sign({
            _id:user._id
        },process.env.JWT_USER_SECRET)
        return res.json({
            message:"Signin Succesfull!",
            token
        })
        
    }catch(error){
        res.status(501).json({
            message:"internal server error"
        })
    }
})
userRouter.get('/me',authicateUser, async (req, res) => {    
    try{
        const user = await userModel.findOne({
            _id:req.user
        })
        const {password, ...userDetails}= user._doc
        res.json({
            message: "user details found",
            userDetails
        })
    }catch(error){
        res.status(409).status({message:"server error"})

    }
})

export default userRouter;