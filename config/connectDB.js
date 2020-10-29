const mongoose = require("mongoose");

const dbUrl = process.env.DB_HOST || "localhost";
const dbDatabase = process.env.DB_DATABASE || "nodejs-demo";
const dbCollection = process.env.DB_CONNECTION || "mongodb";

const connectDB = () => {
    mongoose.connect(`${dbCollection}://${dbUrl}/${dbDatabase}`, { useNewUrlParser: true })
        .then(_ => console.log('Connected successfully to MongoDB'))
        .catch(err => console.error(err));
};

module.exports = connectDB;