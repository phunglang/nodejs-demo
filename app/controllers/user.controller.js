const mongoose = require("mongoose");
let User = require('../models/user.model');

class UserController {
    constructor() {
        this.user = User
    }

    index = (req, res, next) => {
        this.user.find()
            .exec()
            .then(result => {
                res.status(200).json({
                    data: result,
                    message: "Succesfully!"
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    }

    show = (req, res, next) => {
        this.user.findById(req.params.id)
            .exec()
            .then(result => {
                res.status(200).json({
                    data: result,
                    message: "Succesfully!"
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    }

    store = (req, res, next) => {
        const data = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const user = new User(data);
        user.save()
            .then(result => {
                res.status(201).json({
                    data: result,
                    message: "Create user succesfully!"
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    }

    update = (req, res, next) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        this.user.update({ _id: req.params.id }, { $set: data })
            .exec()
            .then(result => {
                res.status(200).json({
                    data: result,
                    message: "Update user succesfully"
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    }

    delete = (req, res, next) => {
        this.user.remove({ _id: req.params.id })
            .exec()
            .then(result => {
                res.status(200).json({
                    data: result,
                    message: "Delete user succesfully"
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    }
};

module.exports = new UserController();