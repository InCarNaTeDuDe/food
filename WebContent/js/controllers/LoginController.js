(function() {
    "use strict";
    angular.module("hangingcafe").controller('LoginController', ['$scope', function($scope) {
        $scope.text = "Hello login please!";
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
                fetch('http://limitless-garden-41603.herokuapp.com/get-help?name='+n+'&phone='+num)
                    .then(function(json){
                        return json.json();
                    }).then(function(data){
                        $scope.ui.content = 'form';
                        console.log("from API:",data); 
                    }).catch(function(e){
                        conosle.error("Error",e);
                    });
            }
        };
    }]);
})();
