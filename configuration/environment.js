function getEnvironment () {
    let environment = {};
    switch(process.env.NODE_ENV){
        case 'dev':
            environment.database = 'mongodb://127.0.0.1:27017/mosh';
            environment.port = 4050;
        break;
        case 'stag':

        break;
        case 'prod':
        break;
    }
    return environment;
}

module.exports = getEnvironment();