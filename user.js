const router =require("express").Router();
const User =require ("../models/user");
const bcrypt=require("bcryptjs"); //to bcript the passwrord npm i bcrypt then this line of code ////////////////////////////////////////////////////
const jwt=require ("jsonwebtoken"); //npm i jsonwebtoken
const {authenticateToken}=require("./userAuth");

//forming diff api for users 
//sign up
router.post("/sign-up" ,async(req,res)=>{
    try{
        const {username,email,password,address}=req.body;

        //check username lengthis more than 4
        if(username.length<4){
            return res
            .status(400)
            .json({message:"Username length should be greater than 3"});
        }
        //check username already exists
        const existingUsername=await User.findOne({username:username});
        if(existingUsername){
            return res
            .status(400)
            .json({message:"Username already exists"});
        }
        //check username already exists
        const existingEmail=await User.findOne({email:email});
        if(existingEmail){
            return res
            .status(400)
            .json({message:"Email already exists"});
        }
        //check password length
        if(password.length<=5){
            return res
            .status(400)
            .json({message:"password length should be greater than 5"});
        }

        const hassPass=await bcrypt.hash(password, 10);

        const newUser=new User({
            username:username,
            email:email,
            password:hassPass,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({message:"Signup Successfull"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Intternal Server Error"});
    }
})

//sign in ///video 2 timestamp 19:00
router.post("/sign-in" ,async(req,res)=>{
    try{
        const {username,password}=req.body;

        const existingUser= await User.findOne({username});
        if(!existingUser)
        {
            res.status(400).json({message:"Invalid Credentials"});
        }
        await bcrypt.compare(password,existingUser.password, (err, data)=>{
             if(data)
             {
                const authClaims=[
                    {name:existingUser.username},
                    {role:existingUser.role},
                ]
                const token=jwt.sign({authClaims},"bookStore123",{expiresIn:"30d",} ) ;  //secret key used fpr secret key //can be kept in .env as well
                res.status(200).json({
                    id:existingUser._id,
                    role:existingUser.role,
                    token:token,

                });
             }
             else{
                res.status(400).json({message:"Invalid Credentials"});
             }
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Intternal Server Error"});
    }
})

//get user information //token , id  use krke get kr skte h sab kux
router.get("/get-user-information",authenticateToken, async(req,res)=>{    //agr authentication pass ho gya fir next() pr jayega ie try ki user viable hai ya nhi 
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select('-password') ;  //displays everything exceput password
        return res.status(200).json(data);

    }
    catch (error){
        res.status(500).json({message:"internal Server error"});
    }
})

//if user wants to update
router.put("/update-address",authenticateToken, async(req,res)=>{
    try{
        const{id}=req.headers;
        const{address}=req.body;
        await User.findByIdAndUpdate (id,{address:address});
        return res.status(200).json({message:"Address updated Successfully"});

    }
    catch (error){
        res.status(500).json({message:"internal Server error"});
    }
} )


module.exports=router;