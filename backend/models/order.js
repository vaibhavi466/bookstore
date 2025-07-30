const mongoose=require ("mongoose");
const order =new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books,"
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed","Out for delivery, Delivery Cancelled"],
    },
},
{timestamps:true}  //recent oder becomes at top 
);
module.exports=mongoose.model("order",order);