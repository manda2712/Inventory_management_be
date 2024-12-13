const jwt = require('jsonwebtoken');

const authorizationAdmin = (req, res, next) =>{
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message : 'Token Not Provided'})  
    } 
    
    try {
        const splitToken = token.split(' ')[1]
        const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);
        console.log("token:", token)
        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({message: 'Unauthorized'})  
        }
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);
        return res.status(401).json({message: 'invalid token'})
        
    }
}

module.exports = authorizationAdmin;