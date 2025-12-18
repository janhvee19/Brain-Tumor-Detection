const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/brain_tumor_app', { serverSelectionTimeoutMS: 2000 })
    .then(() => {
        console.log('MongoDB Connected Successfully');
        process.exit(0);
    })
    .catch(err => {
        console.error('MongoDB Connection Failed:', err.message);
        process.exit(1);
    });
