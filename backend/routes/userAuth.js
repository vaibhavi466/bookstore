// const jwt=require("jsonwebtoken");

// const authenticateToken=(req,res,next)=>{
//     const authHeader=req.headers["authorization"];
//     const token =authHeader && authHeader.split(" ")[1];  //Bearer token 

//     if(token == null){
//         return res.status(401).json({message:"Authentication token required"});
//     }

//     jwt.verify(token,"bookStore123", (err,user)=>{
//         if(err){
//             return res.status(403).json({ message: "Invalid or expired token" });  //token expired case or other error so we need to sign in again
//         }
//         req.user=user;
//         next();
//     });
// };
// module.exports={authenticateToken};



// neeche wala chatgpt ka h uppar wala pushpss ka hai 
// routes/userAuth.js
// userAuth.js
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        // user will contain payload { id, name, role, ... }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
