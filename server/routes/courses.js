import { Router } from "express";
const courseRouter = Router();
import {coursesModel, purchaseModel} from "../models/db.js"
import {userMiddleware,authicateUser} from "../middlewares/user.js"

courseRouter.get('/purchases',authicateUser, async (req, res) => {
    try {
        const purchases = await purchaseModel.find({
            userId:req.user
        })
        const courseIds = purchases.map(purchase => purchase.courseId);

        let courses = await coursesModel.find({
            _id: { $in: courseIds }
        });
        courses = courses.map(obj => {
            const details = obj._doc
            return { ...details, ['userId']: req.user._id };
        })
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
courseRouter.post('/purchase',authicateUser, async (req, res) => {
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

courseRouter.get('/courses',userMiddleware, async (req, res) => {
     try{
        let courses = await coursesModel.find({});

        // If the user is logged in (req.user exists), check for purchases
        if (req.user) {
            const purchases = await purchaseModel.find({
                userId: req.user
            });
            const purchasedCourseIds = new Set(purchases.map(p => p.courseId.toString()));

            courses = courses.map(course => {
                const courseObj = course.toObject(); // Convert Mongoose document to plain object
                if (purchasedCourseIds.has(courseObj._id.toString())) {
                    courseObj.userId = req.user._id;
                }
                return courseObj;
            });
        }


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