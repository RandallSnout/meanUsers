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

        this.showOne = function(userId, callback){
            $http.get('/person/'+userId).then(function(returned_data){
                callback(returned_data);
            });
        };

        this.showAll = function(callback){
            $http.get('/usersAll').then(function(returned_data){
                user = returned_data;
                callback(user);
            });
        };

        this.getAll = function(callback){
            $http.get('/bucketsMine').then(function(returned_data){
                callback(returned_data);
            });
        };

        this.getAllOther = function(userId, callback){
            console.log('bucket factory');
            $http.get('/bucketsOther/'+userId).then(function(returned_data){
                callback(returned_data);
            });
        };

        this.createBucket = function(post, callback){
            console.log('create bucket factory');
            $http.post('/bucket', post).then(function(returned_data){
                callback(returned_data.data);
            })
        };

        this.markComplete = function(buckId){
            console.log('checked off factory');
            console.log(buckId);
            $http.get('/bucketCheck/'+buckId);
        };



    }
    console.log(new UserFactory());
    return new UserFactory();
}]);