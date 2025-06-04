import 'dotenv/config'
import bcrypt from 'bcrypt';
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {

    const { name, email, password, dob, city } = req.body
    const newUser = { name, email, password, dob, city }

    const encryptedPassword = await bcrypt.hash(password, 10);
    newUser.password = encryptedPassword;

    try {
        const createdUser = await User.create(newUser);

        if (!createdUser) {
            res.status(400).json({
                status: 'error',
                message: "Unable to register user. Please try again later."
            })
        }

        res.status(201).json({
            status: 'success',
            message: "User registered successfully",
            data: createdUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });

        if (!userExist) {
            res.status(401).json({
                status: 'error',
                message: "Invalid Credentials!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password);

        if (!isPasswordMatch) {
            res.status(401).json({
                status: 'error',
                message: "Invalid Credentials!"
            })
        }

        const token = jwt.sign({
            userId: userExist._id,
            email: userExist.email
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1h', });

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            data: userExist
        });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}