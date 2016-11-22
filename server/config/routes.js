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
    app.get('/questions', users.getQuests);
    app.post('/questions', users.createQuests);
    app.get('/questions/:id', users.getQuest);
    app.post('/answers/:id', users.createAnswer);
    app.get('/answers/:id', users.getAnswers);
    app.post('/answers/:id/like', users.likeAnswer);
    app.delete('/sessions/logout', sessions.logout);
};