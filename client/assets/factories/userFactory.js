console.log('User Factory');

app.factory('userFactory', ['$http', function($http) {
    // constructor for our factory
    var users = [];
    var user = {};
    function UserFactory(){

        this.register = function(newUser,callback){
            $http.post('/sessions/reg', newUser).then(function(returned_data){
                console.log(returned_data.data);
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            });
        };

        this.login = function(user, callback){
            console.log('Factory Reached for Login');
            console.log(user);
            $http.post('/sessions/log', user).then(function(returned_data){
                console.log(returned_data.data);
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            })
        };

        this.logout = function(){
            $http.delete('/sessions/logout');
        };

        this.show = function(callback){
            $http.get('/users').then(function(returned_data){
                user = returned_data;
                callback(user);
            });
        };

        this.getQs = function(callback){
            $http.get('/questions').then(function(returned_data){
                user = returned_data;
                callback(user);
            });
        };

        this.createQuestion = function(post, callback){
            console.log('question asked in factory');
            console.log(post);
            $http.post('/questions', post).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            })
        };

        this.showQuestion = function(questId, callback){
            console.log(questId);
            $http.get('/questions/'+questId).then(function(returned_data){
                callback(returned_data.data);
            });
        };

        this.createAnswer = function(answer, questId, callback){
            $http.post('/answers/'+questId, answer).then(function(returned_data){
                callback(returned_data.data);
            })
        };

        this.showAnswers = function(questId, callback){
            console.log(questId);
            $http.get('/answers/'+questId).then(function(returned_data){
                callback(returned_data.data);
            });
        };

        this.answerLike = function(answerID, callback){
            console.log('factory likes');
            $http.post('/answers/'+answerID+'/like').then(function(returned_data){
                callback(returned_data.data);
            })
        }

    }
    console.log(new UserFactory());
    return new UserFactory();
}]);