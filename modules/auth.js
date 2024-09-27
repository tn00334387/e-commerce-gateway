const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {

    if( req.visitor ){
        next();
        return
    }

    const token = req.header('Authorization');
    
    if (!token) {
        console.log(`AuthMiddleware : No token, authorization denied`)
        return res.status(401).json({ 
            status: 'Unauthorized',
            message: 'No token, authorization denied' 
        });
    }

    try {
        const userInfo = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.headers['x-user-id'] = userInfo.userId; // pass to others service
        req.user = userInfo;
        next();
    } catch (error) {
        console.log(`AuthMiddleware : `, error)
        res.status(401).json({ 
            status: 'Unauthorized',
            message: 'Token is not valid' 
        });
    }
};

module.exports = AuthMiddleware;
