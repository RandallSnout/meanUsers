console.log('Question model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// build your friend schema and add it to the mongoose.models
var QuestionSchema = new mongoose.Schema({
    //Table Items Here
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    question: {type: String, required: true, minlength: 10},
    description: {type: String },
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
}, {timestamps: true });

var Question = mongoose.model('Question', QuestionSchema);