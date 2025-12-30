import jwt from "jsonwebtoken"
import "dotenv/config"
export default function adminMiddleware(req, res, next){
    try{
        const token = req.headers.token;
        if(!token) return res.status(403).json({message:"unauthorized!"})

        const admin = jwt.verify(token,process.env.JWT_ADMIN_SECRET);
        if(!admin) return res.status(403).json({ message:"admin unauthorized!" })
            
        req.admin=admin;
        next();
    }
    catch(err){
        return res.status(403).json({message:"unauthorized!"})
    }
}