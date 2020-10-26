const mongoose = require("mongoose");
let User = require('../models/user.model');

module.exports = {
    index: async function(req, res, next) {
        User.find()
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
    },
    show: async function(req, res, next) {
        User.findById(req.params.id)
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
    },
    store: async function(req, res, next) {
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
    },
    update: async function(req, res, next) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.update({ _id: req.params.id }, { $set: data })
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
    },
    delete: async function(req, res, next) {
        User.remove({ _id: req.params.id })
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
    },
};