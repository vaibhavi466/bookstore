//for order api
const router =require("express").Router();
const {authenticateToken}=require("./userAuth");
const User =require ("../models/user");
const Order=require("../models/order");
const Book=require("../models/book");


//here we will add all the items of cart to order use for loop
//place order
router.post("/place-order",authenticateToken,async(req, res)=>{
    try{
            const {id}=req.headers; //is user admin
            const {order}=req.body;
            for(const orderData of order){
                const newOrder=new Order({user:id,book:orderData._id});
                const orderDataFromDb=await newOrder.save();  //we will get orderid of all orders
                //saving order in user model
                await User.findByIdAndUpdate(id,{
                    $push:{orders:orderDataFromDb._id},
                });
                await User.findByIdAndUpdate(id,{
                    $pull:{cart:orderData._id},
                });
            }
            return res.json({
                status:"Success",
                message:"Book created successfully ",
            })
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
} )

//oder history of a particular user
router.get("/get-order-history",authenticateToken,async(req, res)=>{
    try{
            const {id}=req.headers; //is user admin
            const userData=await User.findById(id).populate({
                path:"orders",
                populate:{path:"book"},
            });
            const ordersData=userData.orders.reverse();
            return res.json({
                status:"Success",
                data:ordersData,
            });
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
} )
//admin role -get all orders
router.get("/get-all-orders",authenticateToken,async(req, res)=>{
    try{
            const userData=await User.find()
                .populate({
                    path:"book",
                })
                .populate({
                    path:"user",
                })
                .sort({createdAt:-1});
            return res.json({
                status:"Success",
                data:userData,
            });
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
} )

//update order by admin
router.put("/update-status/:id",authenticateToken,async(req, res)=>{
    try{
            const {id}=req.params; 

            await Order.findByIdAndUpdate(id,{status: req.body.status});

            return res.json({
                status:"Success",
                message:"Book created successfully ",
            })
        }
        catch (error){
            res.status(500).json({message:"internal Server error"});
        }
} )


module.exports=router;