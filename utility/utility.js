const environment = require('../configuration/environment');
const jwt = require('jsonwebtoken');

async function getJwt(payload){
    return await jwt.sign(payload, environment.jwtSecretKey,
         { expiresIn: environment.jwtExpiresInSeconds });
}

module.exports.getJwt = getJwt;