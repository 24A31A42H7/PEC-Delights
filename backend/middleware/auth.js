import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // ✅ fixed typo
    req.userId = token_decode.id; // ✅ attach userId
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying token" });
  }
};

export default authMiddleware;


/*
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); // ✅ fixed typo
    req.userId = token_decode.id; // ✅ attach userId safely
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;

*/

/*




import jwt from "jsonwebtoken"

const authMiddleware=async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
        
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRTET);
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }


}

export default authMiddleware;

*/