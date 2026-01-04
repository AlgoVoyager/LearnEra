import express from "express"
import 'dotenv/config'
import userRouter from './routes/users.js'
import adminRouter from './routes/admin.js'
import courseRouter from './routes/courses.js'
import mongoose from "mongoose";
import cors from "cors"

const app = express()

app.use(express.json());
app.use(cors());

app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)

app.get("/", (req, res) => {
    res.json({data:"data"})
})

mongoose.connect(process.env.mongoDBuri).then(()=>{
    console.log("Connected to MongoDB")
}).then (()=>{
    app.listen(process.env.PORT || 3000, () => {
        console.log("LearnEra running on port " + (process.env.PORT || 3000))
    })
}).catch((err)=>{
    console.log(err)
})