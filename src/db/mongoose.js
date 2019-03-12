// -----------------------------   NPM modules   -----------------------------
const mongoose = require('mongoose');



// -----------------------------    Constants     -----------------------------
const CONNECTION_URL = process.env.MONGODB_URL;

const CONNECTION_SETTINGS = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

// -----------------------------    App Logic     -----------------------------
mongoose.connect(CONNECTION_URL, CONNECTION_SETTINGS); // connect to Mongo Database