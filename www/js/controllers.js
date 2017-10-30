angular.module('starter.controllers', [])

    .controller('AppController', function($scope, $ionicHistory, $ionicSideMenuDelegate){
        $scope.closeMenu = function(){
            $ionicHistory.nextViewOptions({disableAnimate: true});
            $ionicSideMenuDelegate.toggleLeft();
        }
    })
    
    .controller('HomeController', function($scope, $http){
        
        $scope.init = function(){
            $http.get("https://appweb-tarley.c9users.io/api/jornal/listToApp/", { params: {} })
            .success(function(resposta){
                console.log(resposta);
                $scope.jornal = resposta.data;
            })
            .error(function(data){
                console.log(data);
            });
        }
    });