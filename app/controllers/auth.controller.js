const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

class AuthController {
    logout = (req, res) => {
        req.logout();
        res.redirect('/api');
    }

    login = (req, res, next) => {
        passport.authenticate('local.login', { session: false }, (err, user, info) => {
            if (err) return next(err);
            if (user) {
                user.token = user.generateJWT();
                return res.status(200).json({ user: user.toAuthJSON() });
            }
            return res.status(422).json(info);
        })(req, res, next);
    }

    passport = () => {
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
    }
}

module.exports = new AuthController();