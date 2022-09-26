const mongoose = require("mongoose");

const Plants = mongoose.model(
    "Plants",
    new mongoose.Schema({
        name: String,
        type: String,
        duration: String
    })
);

module.exports = Plants;