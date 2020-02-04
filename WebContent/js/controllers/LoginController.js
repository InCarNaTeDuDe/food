(function() {
    "use strict";
    angular.module("hangingcafe").controller('LoginController', ['$scope', function($scope) {
        $scope.text = "Hello login please!";
        $scope.ui={};
        $scope.login = function() {
        	if(!this.loginForm.$valid){
        		alert("Please fill in the fields!");
        	}
        };
        $scope.getHelp = function(n,num){
            $scope.ui.toLoad = true;
            fetch('http://limitless-garden-41603.herokuapp.com/get-help?name='+n+'&phone='+num)
                .then(json=>json.json())
                .then(data=>{
                 $scope.ui.toLoad = false;
                 console.log("from API:",data);
            });
        };
    }]);
})();
