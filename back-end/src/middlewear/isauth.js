import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({
        message: 'Token is required',
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // Attach the decoded user info to `req`
    next();
  } catch (err) {
    console.error('Error in isAuth middleware:', err.message);
    return res.status(401).json({
      message: 'Invalid or expired token',
      success: false,
    });
  }
};
