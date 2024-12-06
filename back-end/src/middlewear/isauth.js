import jwt from 'jsonwebtoken'; // Fix typo: use 'jwt' instead of 'jtw'
import dotenv from 'dotenv';

dotenv.config();

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Access the token from cookies
        console.log('token in auth', token);

        if (!token) {
            return res.status(401).json({
                message: 'Invalid token or token is required',
                success: false,
            });
        }

        // Verify the token (correct argument order)
        const decoded = jwt.verify(token, process.env.SECRET); 
        req.user = decoded; // Attach the decoded user info to `req`
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Error in isAuth middleware:', err.message);
        
        // Handle invalid token error
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token',
                success: false,
            });
        }

        // Handle token expiration error
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired',
                success: false,
            });
        }

        // Generic error handler
        next(err);
    }
};
