const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/connectDB');
const config = require('../config/init.config')
const apiRoutes = require('../routes');
const session = require('express-session');
const app = express();

connectDB();
require('./models/user.model');
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));
require('dotenv').config();
require('../config/passport.config')(app);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(config.cors);
app.use('/api/', apiRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
})

module.exports = app;