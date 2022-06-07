const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, { timestamps: true }, { collection: 'auth' });

module.exports = mongoose.model('Auth', AuthSchema);