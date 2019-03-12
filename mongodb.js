// CRUD create read update delete

// -----------------------------   NPM modules   -----------------------------
const { MongoClient, ObjectID } = require('mongodb');


// -----------------------------    Constants     -----------------------------
const CONNECTION_URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'TaskManager';

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database!');
        return;
    }
    
    const db = client.db(DATABASE_NAME);
    
    db.collection('users').insertOne({
        name: 'SHStorm',
        age: 16
    });
});