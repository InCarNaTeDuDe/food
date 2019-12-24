(function() {
    "use strict";
    angular.module("hangingcafe").controller('LoginController', ['$scope', function($scope) {
        $scope.text = "Hello login please!";
        $scope.login = function() {
        	if(!this.loginForm.$valid){
        		alert("Please fill in the fields!");
        	}
        };
    }]);
})();