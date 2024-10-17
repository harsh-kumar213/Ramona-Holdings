import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId,res)=>{
    console.log("setting cookie")
     const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
     });
     console.log(token)
     res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, // ms
        httpOnly:true, // prevent XSS attacks cross-site scripting attacks
        sameSite:"strict", // CSRF attacks cross-site request forgery attacks
        secure : process.env.NODE_ENV!=="development"
     });
     console.log("cookie set")
};

export  default generateTokenAndSetCookie;