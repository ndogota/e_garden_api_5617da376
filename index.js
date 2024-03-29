// Loads the configuration from config.env to process.env (LOCAL WORK) comment when push in Deployment
//require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// get MongoDB driver connection
const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/plants.routes")(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to E-Garden API."});
});

// fetching topics
app.get("/topics", (req, res) => {
    db.topics.find({}, function(err, topics) {
        if(err) {
            console.log(err);
        } else {
            res.json(topics);
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("role 'user' added to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("role 'moderator' added to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("role 'admin' added to roles collection");
            });
        }
    });
}