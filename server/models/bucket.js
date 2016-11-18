console.log('User model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// build your friend schema and add it to the mongoose.models
var BucketSchema = new mongoose.Schema({
    //Table Items Here
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true, minlength: 5},
    description: {type: String, required: true, minlength: 10},
    friend: {type: String},
    checked:{ type: String }
}, {timestamps: true });

var Bucket = mongoose.model('Bucket', BucketSchema);