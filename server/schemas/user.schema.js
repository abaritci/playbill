const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    type: {
        type: String,
        enum: ['user', 'company', 'admin'],
        default: 'user'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
