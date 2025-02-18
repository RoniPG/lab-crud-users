const moongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

moongoose.connect(MONGODB_URI)
    .then(() => {
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB at ${MONGODB_URI}`, err);
        process.exit(0);
    });

process.on('SIGINT', () => {
    moongoose.connection.close(() => {
        console.log(`Closing MongoDB connection at ${MONGODB_URI}`);
        process.exit(0);
    });
});

