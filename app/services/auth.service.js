module.exports = (
    function AuthService() {
        const passport = require("passport")
        const auth = {
            user: null,
            login: login,
            logout: logout,
            updateUser: function(token, email) {
                this.user.token = token
                this.user.email = email
            },
            isAuthenticated: function() {
                return this.user.token ? true : false
            }
        }
        return auth;

        function login(req, res, next) {
            passport.authenticate('local.login', { session: false }, (err, user, info) => {
                if (err) return next(err)
                if (user) {
                    user.token = user.generateJWT()
                    auth.user = user.toAuthJSON()
                    console.log(auth)
                    return res.status(200).json({ user: auth.user })
                }
                return res.status(422).json(info)
            })(req, res, next)
        }

        function logout() {
            return 111;
        }
    }
)()