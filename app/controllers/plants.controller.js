const db = require("../models");

const Plants = db.plants;

exports.getPlants = (req, res) => {
    Plants.find({}, function(err, plants) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).send(plants);
        }
    })
};