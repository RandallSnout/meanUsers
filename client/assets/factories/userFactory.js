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

    }
    console.log(new UserFactory());
    return new UserFactory();
}]);