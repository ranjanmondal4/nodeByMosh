const jwt = require('jsonwebtoken');
const environment = require('../configuration/environment');

/**
 * Middle function to authenticate private URLs by checking
 * token are valid or not.
 * 
 * @param {*} req - The Request Object
 * @param {*} res - The Response Object
 * @param {*} next - The next middleware in request processing chain
 */
function authorization (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).send('Access denied. Token not found');

    jwt.verify(token, environment.jwtSecretKey, function (err, decoded) {
        if(err){
            return res.status(401).send('Access denied. Invalid token');
        }
    
        req.user = decoded;
        next();
    });
}

module.exports = authorization;