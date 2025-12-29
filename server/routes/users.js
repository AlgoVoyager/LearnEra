import { Router } from "express";
const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    res.json({
        message: ""
    })
})
userRouter.post('/signin', async (req, res) => {
    res.json({
        message: ""
    })
})
userRouter.get('/purchases', async (req, res) => {
    res.json({
        message: ""
    })
})

export default userRouter;