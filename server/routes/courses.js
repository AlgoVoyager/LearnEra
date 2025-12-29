import { Router } from "express";
const courseRouter = Router();

courseRouter.post('/purchase', async (req, res) => {
    res.json({
        message: ""
    })
})
courseRouter.post('/course', async (req, res) => {
    res.json({
        message: ""
    })
})
courseRouter.get('/course', async (req, res) => {
    res.json({
        message: ""
    })
})

export default courseRouter;