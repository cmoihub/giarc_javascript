(function(angular){
	var test = angular.module('book',[]);
	test.controller('StatusController', ['$scope', function($scope){
		$scope.status='lovely';
		$scope.goodStatus=function(){
			$scope.status='good';
		}
		$scope.badStatus=function(){
			$scope.status='bad';
		}
	}]);
})(window.angular);