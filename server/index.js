import express from "express"
import 'dotenv/config'

// dotenv.config({ path: '.env' })
const app = express()

app.use(express.json())

app.get("/",(req, res)=>{
   res.json({})
})

app.listen(process.env.PORT, ()=>{
     console.log("LearnEra running on port "+ process.env.PORT)
})