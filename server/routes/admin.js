import { Router } from "express";
const adminRouter = Router();

adminRouter.post('/signup', async (req, res) => {
    res.json({
        message: ""
    })
})
adminRouter.post('/signin', async (req, res) => {
    res.json({
        message: ""
    })
})
adminRouter.post('/course', async (req, res) => {
    res.json({
        message: ""
    })
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
adminRouter.get('/course/bulk', async (req, res) => {
    res.json({
        message: ""
    })
})

export default adminRouter;