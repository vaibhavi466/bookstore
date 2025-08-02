 const express=require("express");
 const cors = require("cors");
 const app= express();

 app.use(cors());  
 app.use(express.json());

 require("dotenv").config();   
 require("./conn/conn");    

 const User=require("./routes/user");
 const Books=require("./routes/book");
 const Favourite=require("./routes/favourite");
 const Cart=require("./routes/cart");
 const Order=require("./routes/order");
 app.use(express.json());
//routes
// app.get("/", (req,res)=>{
//     res.send("Hello from server");
// });

// ye chatgpt add karwaya h , db me book h ki ni ye check krne k liye bs
const bookRoutes = require("./routes/book");
app.use("/api/v1", bookRoutes);





 app.use("/api/v1", User );
 app.use("/api/v1", Books );
 app.use("/api/v1", Favourite );
 app.use("/api/v1", Cart );
  app.use("/api/v1", Order );

 console.log("✅ App started");
 //creating port
 app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});
 app.listen(process.env.PORT,()=>{
    console.log(`Server Started at port ${process.env.PORT} `);
 }) ;

