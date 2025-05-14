const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

//generate JWT token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};


//register user
exports.registerUser = async (req, res) => {
    const {fullName,email,password,profileImageUrl} = req.body;

    //validatation:check for missing fields
    if(!fullName ||!email || !password){
        return res.status(400).json({message:"Please fill in all fields"});
    }

    try {
        //check if email already exists

        const existingUser = await User.findOne({email});
        if(existingUser){
            return  res.status(400).json({message:"User already exists"});
        }

        //create new user 
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl:profileImageUrl || 'https://example.com/default-profile.png',
        });

        res.status(201).json({
        id:user._id,
        user,
        token:generateToken(user._id),    
    });
} catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error registering user",error:error.message});
    }
};

//login user
exports.loginUser = async (req, res) => {
    const {email,password} = req.body;

    //validation:check for missing fields
    if(!email || !password){
        return res.status(400).json({message:"Please fill in all fields"});
    }

    try{
        const user = await User.findOne({email});

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({message:"Invalid email or password"});
        }

        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error logging in user",error:error.message});
    }
};

//get userinfro
exports.getUserInfo = async(req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:"Error getting user info",error:error.message});
    }
};