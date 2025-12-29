import {Schema, mongoose} from "mongoose";
import {ObjectId} from mongoose.Types
import 'dotenv/config'

mongoose.connect(process.env.mongoDBuri).then(()=>{
    console.log("Connected to MongoDB")
})
const userSchema = Schema({
    firstName:{ type: String, unique: true},
    lastName: String,
    email: String,
    password: String,
})
const adminSchema = Schema({
    firstName:{ type: String, unique: true},
    lastName: String,
    email: String,
    password: String,
})
const courseSchema = Schema({
    title: String,
    descripion: String,
    price: Number,
    imgUrl: String,
    creatorId: ObjectId
})
const purchaseSchema = Schema({
    userId:ObjectId,
    creatorId: ObjectId
})


const userModel = mongoose.Model("user",userSchema)
const adminModel = mongoose.Model("user",adminSchema)
const coursesModel = mongoose.Model("user",courseSchema)
const purchaseModel = mongoose.Model("user",purchaseSchema)

export {
    userModel,
    adminModel,
    coursesModel,
    purchaseModel
}