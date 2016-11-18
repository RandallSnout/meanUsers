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

    var allUsers = function(){
        userFactory.showAll(function(returnedData){
            console.log(returnedData.data);
            $scope.users = returnedData.data;
            console.log($scope.users);
        });
    };

    allUsers();

    var getBuckets = function(){
        userFactory.getAll(function(returnedData){
            console.log(returnedData.data);
            $scope.buckets = returnedData.data;
            console.log($scope.buckets);
        });
    };

    getBuckets();

    $scope.addBucket = function(post){
        console.log(post);
      userFactory.createBucket(post, function(data){
          if(data.hasOwnProperty('errors')){
              $scope.errors = data.errors;
              console.log(data.errors);
          } else {
              console.log(data.data);
              getBuckets();
              $scope.post = {};
          }
      })
    };

    $scope.complete = function(itemId){
        console.log('checked off controller');
        console.log(itemId);
        userFactory.markComplete(itemId);
        getBuckets();
    };

    $scope.logOut = function(){
        userFactory.logout();
        $location.url('/');
    }


}]);