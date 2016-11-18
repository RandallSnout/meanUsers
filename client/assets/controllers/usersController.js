app.controller('usersController', ['$scope','userFactory', '$routeParams','$location', function($scope, userFactory, $routeParams, $location) {
    /*
     THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
     WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
     */

    var show = function(){
        userFactory.show(function(returnedData){
            console.log(returnedData.data);
            $scope.user = returnedData.data;
            console.log($scope.user);
        });
    };
    show();

    $scope.logOut = function(){
        userFactory.logout();
        $location.url('/');
    }


}]);