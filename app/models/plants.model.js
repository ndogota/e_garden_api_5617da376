const mongoose = require("mongoose");

const Plants = mongoose.model(
    "Plants",
    new mongoose.Schema({
        name: String
    })
);

module.exports = Plants;