const User = require("../models/User.model");

//register
exports.registerUser = async (req, res) =>{
    try {
        const {name, email, password, confirmPassword} = req.body;

        // check the fields
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                message:"All Fields are required"
            })
        }

        // confirm password check
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"Password do not match"
            })
        }

        // check the user is exists
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                message:"User is already exists"
            })
        }

        // create the user
        const user = await User.create({
            name, 
            email,
            password 
        })

        res.status(201).json({
            message:"User is registered successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

// login

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check the user by email id
        const user = await User.findOne({email});

        if(!user || user.password !== password){
            return res.status(401).json({
                message: "invalid Credentials"
            })
        }

        res.status(200).json({
            message:"Login is successful",
            user 
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getHome = async (req, res) => {
    res.json({
        message:"Welcome to the Hotel Management "
    })
}