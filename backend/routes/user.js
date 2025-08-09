const express = require("express");
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


        // ✅ Check if address is missing or empty -> chatgpt ne karwaya ye
        if (!address || address.trim().length === 0) {
          return res.status(400).json({ message: "Address is required" });
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
        console.error("Signup Error:", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})

//sign in ///video 2 timestamp 19:00
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received login request:", { username, password }); // <-- log input

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      console.log("❌ User not found:", username);
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password); // <-- removed callback

    if (isPasswordValid) {

      // ye pushp ka code h
      // const authClaims = [
      //   { name: existingUser.username },
      //   { role: existingUser.role },
      // ];

      // const token = jwt.sign({ authClaims }, "bookStore123", {
      //   expiresIn: "30d",
      // });


      // ye chatgpt ne krwaya hai (return k pehle tk)
      const token = jwt.sign(
        {
          id: existingUser._id, // ✅ REQUIRED for user identification
          name: existingUser.username,
          role: existingUser.role,
        },
        process.env.JWT_SECRET, // ✅ REPLACED hardcoded secret with .env value
        { expiresIn: "30d" }
      );

      return res.status(200).json({
        id: existingUser._id,
        role: existingUser.role,
        token: token,
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// router.get("/get-user-information", authenticateToken, async (req, res) => {
//   try {
//     const id = req.user.id; // ✅ from JWT
//     const data = await User.findById(id).select('-password');
//     return res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// uppar wala code original hai , neeche wala chatgpt ne likhwaya h
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


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