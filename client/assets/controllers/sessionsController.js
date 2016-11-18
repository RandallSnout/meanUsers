app.controller('sessionsController', ['$scope','userFactory', '$location', function($scope, userFactory, $location) {

    $scope.login = function(user){
        console.log(user);
            userFactory.login(user, function (returnData) {
                if (returnData.hasOwnProperty('errors')) {
                    $scope.errors = returnData.errors;
                } else {
                    // $scope.currentUser = returnData;
                    $location.url('/show');
                }
            })
    };

    $scope.register = function(newUser){
        console.log(newUser);
        userFactory.register(newUser, function(returnData) {
            console.log(returnData);
            if(returnData.hasOwnProperty('errors')){
                $scope.errors = returnData.errors;
            } else {
                // $scope.currentUser = returnData;
                $location.url('/show');
            }
        });
    }

}]);