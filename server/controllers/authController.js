import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// generate access token
const generateToken = (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:'1d'});
}

// sign up
export const signUp = async(req, res) => {
    try {
        const {name, email, password} = req.body;
    
        // fields check
        if(!name || !email || !password){
            return res.status(400).json({message: 'Please fill in all fields'});
        }

        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        // Password validation
        if (password.length < 6) {
        return res.status(400).json({ 
            message: 'Password must be at least 6 characters' 
        });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // returning token , user data
        return res.status(201).json({token: generateToken(user._id), user:{id: user._id, email:user.email}});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;

        // check fields empty or not
        if(!email || !password){
            return res.status(400).json({message: 'Please fill in all fields'});
        }

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // returning token , user data
        return res.status(200).json({token: generateToken(user._id), user:{id: user._id, email:user.email, password: user.password}});

    } catch (error) {
        res.status(500).json({message: error.message});

    }
}