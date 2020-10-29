const jwt = require('express-jwt');

const reqTokenHeaders = (req) => {
    const { headers: { authorization } } = req;
    if (authorization && (authorization.split(' ')[0] === 'Token' || authorization.split(' ')[0] === 'Bearer')) {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: reqTokenHeaders,
        algorithms: ['HS256']
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: reqTokenHeaders,
        credentialsRequired: false,
        algorithms: ['HS256']
    }),
};

module.exports = auth;