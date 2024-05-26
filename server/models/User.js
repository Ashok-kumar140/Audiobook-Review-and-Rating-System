const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,

    },
    image: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        require: true,
    },
    token:{
        type:String
    },
    tokenExpires:{
        type:Date,
    },
});

module.exports = mongoose.model("User", UserSchema);