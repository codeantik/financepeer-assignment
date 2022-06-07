const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    jsonData: [{
        userId: {
            type: Number,
        },
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        body: {
            type: String,
            trim: true,
        }

    }],
}, { timestamps: true }, { collection: 'user' });

module.exports = mongoose.model('User', UserSchema);