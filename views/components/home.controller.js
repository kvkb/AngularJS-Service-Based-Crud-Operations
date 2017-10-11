var app = angular.module("HomePage",[]);

app.controller("HomeController",function($scope,$window,LoginService) {

    $scope.LoginUser = function() {

        $scope.submitted = true;

        if($scope.email != "" && $scope.passw != ""){
            LoginService.SetLoginData($scope.email,$scope.passw);
        }

        if($scope.email == "clarion@clarion.com" && $scope.passw == "Clarion123"){
            $window.location.href = 'http://localhost/gt/#!/Dashboard';
        }

    }
});
