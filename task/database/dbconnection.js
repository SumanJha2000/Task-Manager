const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.DB;
const dbConnection = () => {
    mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('database connnected successfully'))
        .catch(err => console.log(err.message))
}

module.exports = dbConnection;