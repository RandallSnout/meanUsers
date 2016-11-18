console.log('User model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// build your friend schema and add it to the mongoose.models
var UserSchema = new mongoose.Schema({
    //Table Items Here
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true, minlength: 8 }
}, {timestamps: true });

var User = mongoose.model('User', UserSchema);