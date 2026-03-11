import User from "../models/usermodel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const register = async (req, res, next) => {
    try {
        const { fullname, email, password,role } = req.body

        if (!fullname) {
            return res.status(400).json({
                message: " name is required",
                success: false
            })
        }

        if (!email) {
            return res.status(400).json({
                message: " email is required",
                success: false
            })
        }

        if (!password) {
            return res.status(400).json({
                message: " password is required bro",
                success: false
            })
        }

        
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({
                message: "email alredy exist ",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role
        })
        if (user) {
            return res.status(200).json({
                message: "bhai ho gya create ",
                success: true,
                user
            })
        }




    } catch (error) {
        next(error);
    }
}
export default register;


export const Login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "all feild is required ",
                success: false
            })
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                message: "invalid email",
                success: false
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "invalid password",
                success: false
            })
        }


        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({
                message: "Login successful",
                success: true,
                token,
                user

            });


    } catch (error) {
        console.log(error.message)
    }
}

