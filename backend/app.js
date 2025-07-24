 const express=require("express");
 const app= express();

 app.use(express.json());

 require("dotenv").config();   
 require("./conn/conn");    

 const User=require("./routes/user");
 const Books=require("./routes/book");
 const Favourite=require("./routes/favourite");
 app.use(express.json());
//routes
// app.get("/", (req,res)=>{
//     res.send("Hello from server");
// });
 app.use("/api/v1", User );
 app.use("/api/v1", Books );
 app.use("/api/v1", Favourite );

 console.log("✅ App started");
 //creating port
 app.listen(process.env.PORT,()=>{
    console.log(`Server Started at port ${process.env.PORT} `);
 }) ;

