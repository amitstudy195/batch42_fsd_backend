const mongoose = require("mongoose")

// create the schema

// email regex pattern
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        match:[emailRegex, "Please enter the valid email"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }
},
{
    timestamps:true
})

// export the model
module.exports = mongoose.model("User", userschema)