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

    var getQuestions = function(){
        userFactory.getQs(function(returnedData){
            console.log(returnedData.data);
            $scope.questions = returnedData.data;
            console.log($scope.questions);
        });
    };
    getQuestions();

    $scope.questionAsked = function(post){
        console.log('users controller question asked');
        console.log(post);
        userFactory.createQuestion(post, function(data) {
            if (data.hasOwnProperty('errors')) {
                $scope.messageErrors = data.errors;
                console.log(data.errors);
            } else {
                $location.url('/show');
            }
        })
    };

    var getQuestion = function($routeParams){
        userFactory.showQuestion($routeParams.id, function(returnedData){
            $scope.quest = returnedData;
            console.log(returnedData);
        })
    };
    getQuestion($routeParams);

    $scope.answered = function(answer, questId){
        userFactory.createAnswer(answer, questId, function(data) {
            if (data.hasOwnProperty('errors')) {
                $scope.messageErrors = data.errors;
                console.log(data.errors);
            } else {
                $location.url('/show');
            }
        })
    };

    var getAnswers = function($routeParams){
        userFactory.showAnswers($routeParams.id, function(returnedData){
            $scope.question = returnedData;
            console.log(returnedData);
        })
    };
    getAnswers($routeParams);

    $scope.logOut = function(){
        userFactory.logout();
        $location.url('/');
    };

    $scope.likeAnswer = function(commID){
        console.log('Controller likes');
        userFactory.answerLike(commID, function(){
            getQuestion($routeParams);
            getAnswers($routeParams);
        })
    };


}]);