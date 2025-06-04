import jwt from 'jsonwebtoken';
import 'dotenv/config'

const verifyUser = async (req, res, next) => {
    const header = req.headers.authorization

    if (!header) {
        res.status(400).json({
            status: 'error',
            message: 'Unauthorised User!'
        });
    }

    try {
        const token = header.split(' ')[1]
        const tokenData = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        if (!tokenData) {
            res.status(400).json({
                status: 'error',
                message: 'Unauthorised User!'
            });
        }
    
        req.userId = tokenData.userId
        next();
    } catch (err) {
          return res.status(401).json({
            status: 'error',
            message: err.message,
        });
    }
}

export default verifyUser;