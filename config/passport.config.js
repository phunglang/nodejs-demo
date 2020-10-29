const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user.model');

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

    passport.use('local.login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User.findOne({ 'email': email })
                .then(user => {
                    if (!user || !user.validatePassword(password))
                        return done(null, false, { errors: { 'Email or password': 'is invalid' } });
                    return done(null, user);
                })
                .catch(done);
        }));
};