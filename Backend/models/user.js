const mongoose = require('mongoose');

// Define SignUp schema
const signUpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
});


const User = mongoose.model('User', signUpSchema);

module.exports = User;
