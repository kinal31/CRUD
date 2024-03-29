const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const PORT = 8080;

const app = express();
app.use(cors())
app.use(express.json())


//schema
const schemaData = mongoose.Schema({
    name : String,
    email: String,
    mobile : String
},{
    timestamps : true
})

//model
const userModel = mongoose.model("user",schemaData)

//read
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({Success : true, Data : data})
})

//create user 
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({Success: true,message : "data added successfully", Data : data})
})

//update user
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { _id,...rest} = req.body 

    console.log(rest)
    const data = await userModel.updateOne({ _id : _id},rest)
    res.send({success : true, message : "data update successfully", data : data})
})

//delete api
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "data delete successfully", data : data})
})


mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(()=>{
    console.log("MongoDB connected")
    app.listen(PORT, ()=> console.log("server is running"))
})
.catch((err)=> console.log(err))