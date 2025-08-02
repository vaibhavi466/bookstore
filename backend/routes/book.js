//l3 for admit routes
//for both admin and users 
const router =require("express").Router();
const User =require ("../models/user");
const jwt=require ("jsonwebtoken"); //npm i jsonwebtoken
const Book =require ("../models/book");
const {authenticateToken}=require("./userAuth");
const book = require("../models/book");

//add books --admit
router.post("/add-book",authenticateToken,async(req, res)=>{
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
router.put("/update-book", authenticateToken, async(req,res)=>{
    try{
            const {bookid}=req.headers; //is user admin
            await Book.findByIdAndUpdate(bookid, {  //book id hum send karenge jiske basis pr update hoga 
                url:req.body.url,
                title:req.body.title,
                author:req.body.author,
                price:req.body.price,
                desc:req.body.desc,
                language:req.body.language,
            });
            return res.status(200).json({
                message:"Book Updated Successfully",
            });
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
})
//now we have 2 scema books and users in the mongoose

router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
            const {bookid}=req.headers; //is user admin
            await Book.findByIdAndUpdate(bookid); //given book is deleted
            return res.status(200).json({
                message:"Book deleted Successfully",
            });
        }
        catch (error){
            return res.status(500).json({message:"internal Server error"});
        }
})
//non admin apis
//get all books
router.get("/get-all-books",authenticateToken, async(req,res)=>{
    try{
            const books=await Book.find().sort({createdAt:-1});  //created at show krta h when models me timestamp=true
            return res.json({
                status:"success",
                data:books,
            });
        }
        catch (error){
            return res.status(500).json({message:"internal Server error"});
        }

})
//get limited added books limit:4  //for home page
router.get("/get-recent-books",async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1}).limit(2);
        return res.json({
            status:"success",
            data:books,
        });
    }
    catch (error){
            return res.status(500).json({message:"internal Server error"});
        }

})
//get book by id
router.get("/get-book-by-id/:id", async(req,res)=>{
    try{
        const{id}=req.params;
        const book=await Book.findById(id);
        return res.json({
            status:"success",
            data:book,
        });
    }
    catch (error){
        return res.status(500).json({message:"internal Server error"});
    }
})

// ye chapgpt add krwaya h
// temp route to check books in DB
router.get("/check-books", async (req, res) => {
  const books = await Book.find();
  res.json({ count: books.length, books });
});






module.exports=router;

console.log("✅ Book routes loaded");