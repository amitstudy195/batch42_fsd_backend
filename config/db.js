// import mongoose
const mongoose = require("mongoose");

// function to connect db
const connectDB = async () => {
    try{
        // connect to mongodb
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
        
    }catch(error){
        console.log("DB Error");
        
    }
}

// export the function
module.exports = connectDB