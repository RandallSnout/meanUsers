console.log('users controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose')
var User = mongoose.model('User');
function UsersController(){

    this.show = function(req,res){
        //your code here
        User.findOne({_id: req.session.userId}, function(err, result){
            console.log(result);
            res.json(result);
        })
    };
}
module.exports = new UsersController(); // what does this export?