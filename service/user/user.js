const {User} = require('../../model/index');
let _ = require('lodash');
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

    // user = new User({
    //     name: data.name,
    //     email: data.email,
    //     password: data.password
    // });

    user = new User(_.pick(data, ['name', 'email', 'password']));
     
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

// async function findUserByEmail(email){
//     try {
//         return await User.findOne({
//             email: data.email
//         });
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }

// function getPromiseRejection(error) {
//     try {
//         return Promise.reject(error);
//     } catch (error) {
//         return error
//     }
// }

module.exports.addUser = addUser;