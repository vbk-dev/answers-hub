const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token){
        return res.status(401).json({error: 'No Token, authorization failed'});
    }
    try {
        const decoded = jwt.verify(token, keys.JWT_SECRET);
        req.user_id = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Invalid Token, authorization failed'});
    }
}