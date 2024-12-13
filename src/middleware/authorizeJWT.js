const jwt = require ("jsonwebtoken")

function authorizeJWT(req, res, next) {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({message : 'Tidak ada token! gagal mengakses fitur'})
    }
    try {
        const splitToken = token.split(' ')[1]
        const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({message: "Gagal mengutentikasi token"})
        
    }
}

module.exports =
    authorizeJWT

