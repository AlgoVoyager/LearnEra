import jwt from "jsonwebtoken"
function authicateUser(req, res, next){
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
function userMiddleware(req, res, next){
    try{
        const token = req.headers.token;
        if(token==undefined){
            req.user = null
            next();
        }else{
            const user = jwt.verify(token,process.env.JWT_USER_SECRET);
            if(!user){
                req.user = null
                next();
            }else{
                req.user=user;
                next();
            }
        }
    }
    catch(err){
        console.log(err)
        return res.status(403).json({message:"unauthorized!"})
    }
}
export {
    userMiddleware,
    authicateUser
}