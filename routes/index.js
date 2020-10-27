const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json({
        status: 200,
        message: 'API Its Working! Welcome to nodejs-demo application!',
    });
})

const UserController = require('../app/controllers/user.controller');

router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

module.exports = router;