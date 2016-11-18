var users = require('../controllers/users.js');
var sessions = require('../controllers/sessions.js');

function loginAuthentication(req,res,next){
    if (req.session.userId){
        next();
    }else{
        res.status(401).send("User not found");
    }
}

module.exports = function(app){
    app.post('/sessions/reg', sessions.register);
    app.post('/sessions/log', sessions.login);
    app.use(loginAuthentication);
    app.get('/users', users.show);
    app.delete('/sessions/logout', sessions.logout);
};