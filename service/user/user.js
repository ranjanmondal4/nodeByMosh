const {User} = require('../../model/index');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const utility = require('../../utility/utility');


/**
 * Registers a new user.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
async function addUser(req, res) {
   
    let data = req.body;

    let user = await User.findOne(_.pick(data, ['email']));
    if (user)
        return res.status(400).send('User already registered with same email');

    user = new User(_.pick(data, ['name', 'email', 'password']));
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;

    createUser(user)
        .then(() => 
            res.status(200).send(_.pick(user, ['_id','name', 'email'])))
        .catch(error => res.status(400).send(error));
}

/**
 * Saves the user object in the database
 * @param {Object} user - The user object to saved in database
 */
async function createUser(user) {
    try {
        return await user.save();
    } catch (error) {
       // console.log('Error in creating new user ', error);
        return getPromiseRejection(error);
    }
}

/**
 * Login method for user and on success provides JWT token
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
async function userLogin(req, res) {
    let data = req.body;
    data = _.pick(data, ['email', 'password']);

    let user = await User.findOne({email: data.email});
    if(!user){
        return res.status(400).send('Email is not registered');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if(!validPassword){
        return res.status(400).send('Please enter correct password');
    }

    //const token = await utility.getJwt({_id: user._id});
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).status(200).send({token: token});
}

async function getUser(req, res){
    let data = req.user;

    let user = await User.findById(data._id)
                .select('-password');
    if(!user) 
        return res.status(401).send('Access Denied. Invalid Token');
    
    return res.status(200).send(user);
}

async function adminLogin(req, res) {
    let data = req.body;
    data = _.pick(data, ['email', 'password']);

    let user = await User.findOne({
        email: data.email, isAdmin: true
    });
    if (!user) {
        return res.status(400).send('Email is not registered');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) {
        return res.status(400).send('Please enter correct password');
    }

    //const token = await utility.getJwt({_id: user._id});
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).status(200).send({
        token: token
    });
}

module.exports.addUser = addUser;
module.exports.userLogin = userLogin;
module.exports.getUser = getUser;
