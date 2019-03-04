const jwt = require('jsonwebtoken');
const environment = require('../configuration/environment');

/**
 * Middle function to authenticate private URLs by checking
 * token are valid or not.
 * 
 * @param {Object} req - The Request Object
 * @param {Object} res - The Response Object
 * @param {Object} next - The next middleware in request processing chain
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
/**
 * Middle ware function to authenticate whether user is admin or not.
 * 
 * @param {Object} req - The Request Object
 * @param {Object} res - The Response Object
 * @param {Object} next - The next middleware in request processing chain
 */
function adminAutorization(req, res, next) {
    if (req.user && req.user.isAdmin){
        next();
    }else{
        return res.status(403).send('Access Denied');
    }
}

module.exports.authorization = authorization;
module.exports.admin = adminAutorization;