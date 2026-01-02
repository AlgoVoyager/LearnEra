import {Schema, mongoose} from "mongoose";

const userSchema = Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true},
    password: String,
})
const adminSchema = Schema({
    firstName:String,
    lastName: String,
    email: { type: String, unique: true},
    password: String,
})
const courseSchema = Schema({
    title: String,
    descripion: String,
    price: Number,
    imgUrl: String,
    creatorId: mongoose.Types.ObjectId
})
const purchaseSchema = Schema({
    userId:mongoose.Types.ObjectId,
    courseId: mongoose.Types.ObjectId
})


const userModel = mongoose.model("user",userSchema)
const adminModel = mongoose.model("admin",adminSchema)
const coursesModel = mongoose.model("courses",courseSchema)
const purchaseModel = mongoose.model("purchase",purchaseSchema)

export {
    userModel,
    adminModel,
    coursesModel,
    purchaseModel
}