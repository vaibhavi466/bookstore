const router =require("express").Router();
const User =require ("../models/user");
const {authenticateToken}=require("./userAuth");

//add book to favourite
router.put("/add-book-to-favourite", authenticateToken,async(req,res)=>{
   try{
            const{bookid,id}=req.headers;
            const userData=await User.findById(id);
            const isBookFavourite=userData.favourites.includes(bookid);
            if(isBookFavourite){
                return res.status(200).json({message:"Book is already in favourites"});
            }
            await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
            return res.status(200).json({message:"Book added in favourites"});
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
})
//delete book  favourite
router.delete("/remove-book-from-favourite", authenticateToken,async(req,res)=>{
   try{
            const{bookid,id}=req.headers;
            const userData=await User.findById(id);
            const isBookFavourite=userData.favourites.includes(bookid);
            if(isBookFavourite){
                await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
            }
            return res.status(200).json({message:"Book removed from favourites"});
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
})
//add book to favourites
router.get("/get-favourite-books", authenticateToken,async(req,res)=>{
   try{
            const{id}=req.headers;
            const userData=await User.findById(id).populate("favourites");
            const FavouriteBooks=userData.favourites
            
            return res.json({
                status:"Success",
                data:FavouriteBooks,
            });
        }
        catch (error){
            res.status(500).json({message:"an error occured "});
        }
})

module.exports=router;