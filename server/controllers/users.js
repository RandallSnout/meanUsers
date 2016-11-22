console.log('users controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
module.exports = {

    show: function(req,res){
        //your code here
        User.findOne({_id: req.session.userId}, function(err, result){
            console.log(result);
            res.json(result);
        })
    },

    getQuests: function(req, res) {
        Question.find({}).populate('_user').populate({
            path: 'answer',
            model: 'Answer',
            populate: {path: '_user', model: 'User'}
        }).exec(function (err, messages) {
            if (err) {
                console.log('unable to grab questions');
                res.sendStatus(404);
            } else {
                console.log('Question!');
                res.json(messages);
            }
        })
    },

    getQuest: function(req, res) {
        Question.findOne({_id: req.params.id}).exec(function (err, question) {
            if (err) {
                console.log('unable to grab question');
                res.sendStatus(404);
            } else {
                console.log('Question found');
                console.log(question);
                res.json(question);
            }
        })
    },

    createQuests: function(req,res){
        var newQuestion = new Question(req.body);
        console.log(req.body);
        console.log('step 3');
        console.log(req.session.userId);
        newQuestion._user = req.session.userId;
        newQuestion.save( function(err, result) {
            if(err) {
                console.log('unable to add message');
                console.log(err);
                res.json(err);
            } else {
                console.log('successfully added a message!');
                res.json(result);
            }
        })
    },

    createAnswer: function(req,res){
        var newAnswer = new Answer(req.body);
        console.log(req.body);
        newAnswer._user = req.session.userId;
        newAnswer._question = req.params.id;
        newAnswer.save(function(err,results){
            if(err){
                res.json(err)
            }else{
                console.log('added a comment');
                Question.findOne({_id: req.params.id}).exec(function(err, question){
                    if(err){
                        res.json(err)
                    }else{
                        question.answers.push(newAnswer._id);
                        question.save(function(err,results){
                            if(err){
                                res.json(err)
                            }else{
                                console.log('we made it fam');
                                res.sendStatus(200);
                                console.log(results);
                            }
                        })
                    }
                })
            }
        })
    },

    getAnswers: function(req, res) {
        Question.findOne({_id: req.params.id}).populate({path:'answers', model:'Answer', populate:{path:'_user', model:'User'}}).exec(function (err, question) {
            if (err) {
                console.log('unable to grab question');
                res.sendStatus(404);
            } else {
                console.log('Question found');
                console.log(question);
                res.json(question);
            }
        })
    },

    likeAnswer: function(req, res){
        console.log('Controller likes');
        Answer.findOne({_id: req.params.id}).exec(function(err, answer){
            if(err){
                res.json(err)
            }else {
                answer.likes.push(req.session.userId);
                console.log('Like pushed');
                answer.save(function(err, results){
                    if(err){
                        console.log('Like not saved');
                        res.json(err)
                    }else {
                        console.log('Message had been Liked');
                        res.sendStatus(200);
                        console.log(results);
                    }
                })
            }
        })
    }
}
