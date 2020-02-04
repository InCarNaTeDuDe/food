(function() {
    "use strict";
    angular.module("hangingcafe").controller('LoginController', ['$scope','$http', function($scope,$http) {
        $scope.ui={
            content: 'form'
        };
        $scope.login = function() {
        	if(!this.loginForm.$valid){
        		alert("Please fill in the fields!");
        	}
        };
        $scope.getHelp = function(n,num){
            if(n && num){
                $scope.ui.content = 'loader';
                $http.get('http://limitless-garden-41603.herokuapp.com/get-help?name='+n+'&phone='+num)
                    .then(function(response){
                        $scope.ui.content = 'form';
                        alert("Thank you "+response.data.name+" for contacting ,Will assist you shortly!")
                    }).catch(function(e){
                        conosle.error("Error",e);
                    });
            }
        };
    }]);
})();
