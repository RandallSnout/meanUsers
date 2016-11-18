console.log('sessions controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
var User = mongoose.model('User');
module.exports = {

    register: function(req,res){
        console.log("In my users");
        if (req.body.password != req.body.pw_check){
            var noMatch = {errors: {password: {message:"Passwords did not match, Please try again."}}};
            res.json(noMatch);
        } else {
            var user = new User(req.body);
            user.save(function(err,user){
                if (err){
                    res.json(err);
                }else{
                    req.session.user = {
                        name: user.name,
                        _id: user._id
                    };
                    req.session.userId = user._id;
                    res.sendStatus(200);
                }
            });
        }
    },

    login: function(req,res) {
        console.log('server controller reached for login');
        console.log(req.body);
            User.findOne({email: req.body.email}).exec(function (err, user) {
                if(user) {
                    if (req.body.password == user.password) {
                        console.log('User password matches');
                        req.session.userId = user._id;
                        res.json(user)
                    } else {
                        res.json(err);
                    }
                } else {
                    var noUser = {errors: {password: {message:"User does not exist, Please try again."}}};
                    res.json(noUser);
                }
            })
    },

    logout: function(req, res) {
        req.session.userId = null;
        console.log('logged out');
        console.log(req.session.userId);
        res.sendStatus(401);
    }

}