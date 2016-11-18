app.controller('singleController', ['$scope','userFactory', '$routeParams','$location', function($scope, userFactory, $routeParams, $location) {
    /*
     THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
     WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
     */

    var showSingle = function($routeParams){
        userFactory.showOne($routeParams, function(returnedData){
            console.log(returnedData.data);
            $scope.user = returnedData.data;
            console.log($scope.user);
        });
    };
    showSingle($routeParams.id);

    var getBuckets = function($routeParams){
        userFactory.getAllOther($routeParams.id, function(returnedData){
            console.log(returnedData.data);
            $scope.buckets = returnedData.data;
            console.log($scope.buckets);
        });
    };

    getBuckets($routeParams);

    $scope.logOut = function(){
        userFactory.logout();
        $location.url('/');
    }


}]);