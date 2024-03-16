const express=require("express");
const mongoose=require("mongoose");

const port =8080;

const app=express();

app.get("/",(req,res)=>{
  res.send("hi i am root ")
})

main().then(()=>{
  console.log("connected to db");
}).catch((err)=>{
  console.log(err);
})

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/wandurlust")
}





app.listen(port,()=>{
  console.log("server is listening to port ",port);

})