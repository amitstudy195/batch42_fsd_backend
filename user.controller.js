const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add this at the top - define JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

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

        const hashed = bcrypt.hashSync(password, 10);

        // create the user
        const user = await User.create({
            name, 
            email,
            password :hashed
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

        // FIXED: Removed incorrect plaintext password comparison
        if(!user){
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        // FIXED: Properly compare hashed password using bcrypt
        const isMatch = bcrypt.compareSync(password, user.password);

        if(!isMatch){
            // FIXED: Changed from res.send() to res.status().json()
            return res.status(401).json({
                message: "Wrong password. Please try again."
            })
        }

        // FIXED: Added JWT_SECRET constant
        const token = jwt.sign(
            {
                id: user._id,
                // FIXED: Changed from user.username to user.name
                name: user.name
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(200).json({
            message: "Login is successful",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getHome = async (req, res) => {
    res.json({
        message:"Welcome to the Hotel Management "
    })
}