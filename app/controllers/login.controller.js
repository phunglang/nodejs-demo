const passport = require("passport");

class LoginController {
    login = (req, res, next) => {
        passport.authenticate('local.login', { session: false }, (err, user, info) => {
            if (err) return next(err)
            if (user) {
                user.token = user.generateJWT()
                return res.status(200).json({ user: user.toAuthJSON() })
            }
            return res.status(422).json(info)
        })(req, res, next)
    }
}

module.exports = new LoginController();