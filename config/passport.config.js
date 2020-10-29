const passport = require('passport');
const User = require('../app/models/user.model');
const Auth = require('../app/controllers/auth.controller');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    Auth.passport();
};