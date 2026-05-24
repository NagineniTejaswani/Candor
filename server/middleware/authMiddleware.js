import User from '../models/User.js';
import jwt from 'jsonwebtoken';


const protect = async(req, res, next) =>{
    try {

        const authHeader = req.headers.authorization;

        // Check for token in headers
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({ message: 'No token , access denied' });
        }
        // extracting token
        const token = authHeader.split(' ')[1];

        // verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: error.message || 'Token is not valid'});
    }

}

export default protect;