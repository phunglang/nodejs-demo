const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../app/middleware/auth.middleware');

router.get('/', function(req, res) {
    res.json({
        status: 200,
        message: 'API Its Working! Welcome to nodejs-demo application!',
    });
})

const UserController = require('../app/controllers/user.controller');
const AuthController = require('../app/controllers/auth.controller');

router.post('/login', auth.optional, AuthController.login);

router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.post('/users', auth.required, UserController.store)
router.put('/users/:id', auth.required, UserController.update)
router.delete('/users/:id', auth.required, UserController.delete)

module.exports = router;