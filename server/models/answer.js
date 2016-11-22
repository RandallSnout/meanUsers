console.log('Question model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// build your friend schema and add it to the mongoose.models
var AnswerSchema = new mongoose.Schema({
    //Table Items Here
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    _question: { type: Schema.Types.ObjectId, ref: 'Question'},
    answer: {type: String, required: true, minlength: 5},
    details: {type: String },
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true });

var Answer = mongoose.model('Answer', AnswerSchema);