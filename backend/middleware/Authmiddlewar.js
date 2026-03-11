import jwt from "jsonwebtoken"


const userAuth = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message: " Auth failed",
                success: false
            })

        }
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId };
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token",
            success: false
        });
    }
};
export default userAuth ;