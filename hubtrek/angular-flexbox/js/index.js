var app = angular.module("App", []);

app.controller("base", function($scope) {
  
  $scope.columns = [1,2,3,4];
  $scope.rows = [];
  $scope.minis = [1,2,3];
  
  $scope.add = function add(type, size){
    if(!type) return;
    var newValue;
    if(size){
      if($scope[type].length){
        var lastIndex = $scope[type].length - 1;
        var numb = $scope[type][lastIndex].number + 1;
        newValue = {
          number: numb,
          size: size
        }
      }else{
        newValue = {
          number: 1,
          size: size
        }
      }
    } else{
      if($scope[type].length){
        var lastIndex = $scope[type].length - 1;
        newValue = $scope[type][lastIndex] + 1;
      } else {
        newValue = 1;
      }
    }

    $scope[type].push(newValue);
  }
  $scope.remove = function remove(index, type){
    if(index == null || !type) return;
    $scope[type].splice(index, 1);
  }
  
  
});