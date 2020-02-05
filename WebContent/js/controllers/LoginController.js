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
        
        window.appDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (!window.appDB) {
            console.error("DB is not supported!");
        }
        var request = window.appDB.open("hangingcageDB", 1),
            db, tx, store, index;
        
        request.onupgradeneeded = function (e) {
            var db = request.result,
                store = db.createObjectStore("help", { keyPath: "id" }),
                index = store.createIndex("helpText", "helpText", { unique: false });
        };

        request.onerror = function (e) {
            console.log("Error on request :" + e.target.errorCode);
        };
        request.onsuccess = function (e) {
            db = request.result;
            tx = db.transaction("help", "readwrite");
            store = tx.objectStore("help");
            index = store.index("helpText");

            db.onerror = function (e) {
                console.log("Error :" + e.target.errorCode);
            };

            store.put({ id: 1, helpText: "Birthday cake order", name: "Bharath", number: "1221648" });
            store.put({ id: 2, helpText: "Table Booking", name: "Chandu", number: "4885155555" });

            var all = store.getAll();
            all.onsuccess = function () {
                console.log(all.result)
            }

            var query = store.get(1);
            query.onsuccess = function () {
                console.log(query.result);
                console.log(query.result.helpText);
            };

            tx.oncomplete = function () {
                db.close();
            };
        };

        
        $scope.getHelp = function(n,num){
            if(n && num){
                $scope.ui.content = 'loader';
                $http.get('http://limitless-garden-41603.herokuapp.com/get-help?name='+n+'&phone='+num)
                    .then(function(response){
                        $scope.ui.content = 'form';
                        store.put({helpText:response.data.num,name:response.data.name,number:response.data.num});
                        alert("Thank you "+response.data.name+" for contacting ,Will assist you shortly!");
                        console.log("Fetching data...");    
                        console.log(store.getAll());
                    }).catch(function(e){
                        console.error("Error",e);
                    });
            }
        };
        
    }]);
})();
