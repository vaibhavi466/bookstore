 const express=require("express");
 const app= express();

 app.use(express.json());

 require("dotenv").config();
 require("./conn/conn");

 const User=require("./routes/user");
 const Books=require("./routes/book");

//routes
// app.get("/", (req,res)=>{
//     res.send("Hello from server");
// });

//routes
app.use("/api/v1", User );
app.use("/api/v1", Books );

 //creating port
 app.listen(process.env.port,()=>{
    console.log(`Server Started at port ${process.env.PORT} `);
 }) ;