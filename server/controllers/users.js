console.log('users controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
var User = mongoose.model('User');
var Bucket = mongoose.model('Bucket')
module.exports = {

    show: function(req,res){
        //your code here
        User.findOne({_id: req.session.userId}, function(err, result){
            console.log(result);
            res.json(result);
        })
    },
    showUsers: function(req,res){
        //your code here
        User.find({_id: {'$ne':req.session.userId }}, function(err, result){
            console.log(result);
            res.json(result);
        })
    },

    addBucket: function(req, res){
        console.log('create bucket server controller');
        var newBucket = new Bucket(req.body);
        newBucket._user = req.session.userId;
        newBucket.save(req.body, function(err, result){
            console.log(req.body);
            if(err){
                res.json(err)
            }else{
                res.json(result)
                // var secondBucket = new Bucket(req.body);
                // console.log('second bucket user ID'+req.body.tagged)
                // secondBucket._user = req.body.tagged;
                // console.log('create bucket added second user');
                // secondBucket.save(req.body, function(err, result){
                //     console.log(req.body);
                //     if(err){
                //         res.json(err)
                //     }else{
                //         res.json(result)
                //     }
                // })
            }
        })
    },
    myBuckets: function(req,res){
        //your code here
        Bucket.find({_user: req.session.userId} || {friend: req.session.userId}).populate('_user').exec(function(err, result){
            console.log(result);
            res.json(result);
        })
    },
    otherBuckets: function(req,res){
        //your code here
        Bucket.find({friend: req.params.id} || {_user: req.params.id}).populate('_user').exec(function(err, result){
            console.log('controller bucket below');
            console.log(result);
            res.json(result);
        })
    },
    addCheck: function(req, res){
        console.log("DATA TO CREATE", req.params.id);
        Bucket.findOne({_id: req.params.id}, function(err, checkBuck){
            if(err){
                console.log(err);
            } else {
                checkBuck.checked = "checked";
                checkBuck.save(function(err,checkObject){
                    if (err){
                        console.log(err);
                    } else {
                        res.json(checkObject);
                    }
                })
            }
        })
    },
    findOne: function(req, res){
        User.findOne({_id: req.params.id}, function(err, result){
            console.log(result);
            res.json(result);
        })
    }
 }