const session = require('express-session');
const config  = require('../config');

module.exports = session({
    key: 'express.sid',
    secret: config.sessionSecret,
    resave: true,
    unset: 'destroy',
    saveUninitialized: true
});