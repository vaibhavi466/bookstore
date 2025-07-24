//for schema
const mongoose=require("mongoose");
const user =new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique :true,
    },
    email:{
        type: String,
        required:true,
        unique :true,
    },
    password:{
        type: String,
        required:true,
    },
    address:{
        type: String,
        required:true,
    },
    avatar:{
        type:String,
        dafault:"http://cdn-icons-png.flaticon.com/128/1377/3177440.png",
    },
    role:{
        type:String,
        default:"user",
        enum:["user", "admin"],
    },
    favourites:[  //this model is object type 
        {
            type:mongoose.Types.ObjectId,
            ref:"book",
        },
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"book",
        },
    ],
    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"order",
        },
    ],

},{timestamps:true}
);
module.exports=mongoose.model("user",user);