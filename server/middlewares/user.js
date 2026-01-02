import jwt from "jsonwebtoken"
export default function userMiddleware(req, res, next){
    try{
        const token = req.headers.token;
        if(!token) return res.status(403).json({message:"unauthorized!"})

        const user = jwt.verify(token,process.env.JWT_USER_SECRET);
        if(!user) return res.status(403).json({ message:"user unauthorized!" })
            
        req.user=user;
        next();
    }
    catch(err){
        return res.status(403).json({message:"unauthorized!"})
    }
}