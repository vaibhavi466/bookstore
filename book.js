//l3 for admit routes
//for both admin and users 
const router =require("express").Router();
const User =require ("../models/user");
const jwt=require ("jsonwebtoken"); //npm i jsonwebtoken
const Book =require ("../models/book");
const {authenticateToken}=require("./userAuth");

//add books --admit
router.post("/addbook",authenticateToken,async(req, res)=>{
    try{
            const {id}=req.headers; //is user admin
            const user = await User.findById(id);
            if(user.role !=="admin"){
                res.status(400).json({message:"You do not have access to perform admin operation"});
            }

            const book=new Book({
                url:req.body.url,
                title:req.body.title,
                author:req.body.author,
                price:req.body.price,
                desc:req.body.desc,
                language:req.body.language,
            });
            await book.save();
            res.status(200).json({message:"Book created successfully "})
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
} )

//update books



module.exports=router;