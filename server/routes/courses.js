import { Router } from "express";
const courseRouter = Router();
import {coursesModel, purchaseModel} from "../models/db.js"
import userMiddleware from "../middlewares/user.js"

courseRouter.get('/purchases',userMiddleware, async (req, res) => {
    try {
        const purchases = await purchaseModel.find({
            userId:req.user
        })
        const courseIds = purchases.map(purchase => purchase.courseId);

        const courses = await coursesModel.find({
            _id: { $in: courseIds }
        });
        res.json({
            purchases:courses
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:"cannot get purchase data"
        })
    }
})
courseRouter.post('/purchase',userMiddleware, async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await coursesModel.findOne({_id:courseId})
        if(!course){
            res.status(404).json({
                message:"Course Not Found!"
            })
        }
        
        await purchaseModel.create({
            userId:req.user,
            courseId
        })
        res.json({
            message:"Course Purchase Succesfull",
            courseId
        })
    } catch (error) {
        res.json({
            message: "Failed to purchase course"
        })
    }
})

courseRouter.get('/courses', async (req, res) => {
    try{
        const courses = await coursesModel.find()

        res.json({
            message: "Courses Fetched Succesfully",
            courses
        })
    }catch(error){
        res.json({
            message: "Failed to Fetch Courses!"
        })
    }
    
})

export default courseRouter;