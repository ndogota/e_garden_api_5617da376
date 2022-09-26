const mongoose = require("mongoose");

const Plants = mongoose.model(
    "Topics",
    new mongoose.Schema({
        name: String
    })
);

module.exports = Plants;