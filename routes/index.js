const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to nodejs-demo application!',
    });
})

const UserController = require('../app/controllers/user.controller');

router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
router.patch('/users/:id', UserController.update)
router.delete('/users/:id', UserController.remove)

module.exports = router;