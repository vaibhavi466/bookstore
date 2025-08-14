const router =require("express").Router();
const User =require ("../models/user");
const {authenticateToken}=require("./userAuth");

//add to cart
router.put("/add-to-cart", authenticateToken,async(req,res)=>{
   try{
            const{bookid,id}=req.headers;
            const userData=await User.findById(id);
            const isBookinCart=userData.cart.includes(bookid);
            if(isBookinCart){
                return res.status(200).json({message:"Book is already in cart"});
            }
            await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
            return res.status(200).json({message:"Book added to cart"});
        }
        catch (error){
            res.status(500).json({message:"An error occured"});
        }
})

//remove from cart
router.put("/delete-from-cart/:bookid", authenticateToken,async(req,res)=>{  //book is available in book schema just removing from a particular schema su use put not delete
   try{
            const{bookid}=req.params;   //for deleting we use params we can use headers as well
            const{id}=req.headers;
            await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
            return res.status(200).json({message:"Book removed from cart"});
        }
        catch (error){
            res.status(500).json({message:"An error occured"});
        }
})

//cart of a particular user
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
            const{id}=req.headers;
            console.log("User ID from headers:", id);  // Debug log
            if (!id) {
                return res.status(400).json({ message: "User ID is missing in headers" });
            }
            const userData=await User.findById(id).populate("cart");
            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }
            if(!userData.cart){
                return res.status(404).json({ message: "Cart is empty" });
            }
            const cart=userData.cart.reverse();

            return res.json({
                status:"Success",
                data:cart,
            });
        }
        catch (error){
            res.status(500).json({message:"An error occured"});
        }
})

module.exports=router;