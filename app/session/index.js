var session = require('express-session');
var config  = require('../config');

var init = () => {
    return session({
        secret: config.sessionSecret,
        resave: true,
        unset: 'destroy',
        saveUninitialized: true
    });
}

module.exports = init();