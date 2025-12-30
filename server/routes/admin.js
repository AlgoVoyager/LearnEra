import { Router } from "express";
const adminRouter = Router();
import z from "zod";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { adminModel, coursesModel } from "../models/db.js";
import 'dotenv/config'
import adminMiddleware from "../middlewares/admin.js"

adminRouter.post('/signup', async (req, res) => {
    const signupSchema = z.object({
        firstName: z.string().min(3).max(20),
        lastName: z.string().min(3).max(20),
        email: z.string().email(),
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
        const admin = await adminModel.findOne({email});
        if(admin){
            return res.status(409).json({
                message:"Email already exists!"
            })
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        await adminModel.create({
            email,
            password:hashedPassword,
            firstName,
            lastName
        })
        res.json({
            message:"admin Created Succesfully"
        })

    }catch(error){
        res.status(501).json({message:"Internal server error!"})
        console.log(error)
    }
})
adminRouter.post('/signin', async (req, res) => {
    const signinSchema = z.object({
        email: z.string().email(),
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
        const admin = await adminModel.findOne({email});
        if(!admin)
            return res.status(401).json({message:"Email not found!"});
        const matchPassword = await bcryptjs.compare(password,admin.password);
        if(!matchPassword)
            return res.status(401).json({message:"Incorrect Password!"});
        const token = jwt.sign({
            _id:admin._id
        },process.env.JWT_ADMIN_SECRET)
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
adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const courseSchema = z.object({
        title: z.string().min(5).max(50),
        descripion: z.string(),
        price: z.number(),
        imgUrl: z.string(),
    })
    const parsedBody = courseSchema.safeParse(req.body);
    if (!parsedBody.success) {
        const errorCause = JSON.parse(parsedBody.error.message)[0]
        return res.status(400).json({
            message:`${errorCause.path[0]} - ${errorCause.message}`
        })
    }
    const { title, descripion, price, imgUrl } = parsedBody.data;
    try{

        const adminId = req._id;
        const course = await coursesModel.create({
            title, descripion, price, imgUrl, creatorId:adminId
        })
        
        res.json({
            message:"Course Created",
            courseId:course._id
        })
    }catch(error){
        res.json({message:"Internal server error!"})
    }

    
})
adminRouter.put('/course', async (req, res) => {
    res.json({
        message: ""
    })
})
adminRouter.delete('/course', async (req, res) => {
    res.json({
        message: ""
    })
})
adminRouter.get('/course/bulk',adminMiddleware, async (req, res) => {
    const courses = await coursesModel.find({})
    res.json({
        message: "courses fetch succesfull",
        courses
    })
})

export default adminRouter;