angular.module('starter.controllers', [])

    .controller('AppController', function($scope, $ionicHistory, $ionicSideMenuDelegate){
        $scope.closeMenu = function(){
            $ionicHistory.nextViewOptions({disableAnimate: true});
            $ionicSideMenuDelegate.toggleLeft();
        }
    })
    
    .controller('HomeController', function($scope, $http, $ionicLoading){
        
        $scope.init = function(){
            
            $ionicLoading.show({
               template: 'Carregando...'
            }).then(function() {
                console.log("Loading exibido.");
            });
            
            
            $http.get("http://www.jornalzeitgeist.com.br/api/jornal/listToApp/", { params: {} })
            .success(function(resposta){
                console.log(resposta);
                $scope.jornal = resposta.data;
                
                $ionicLoading.hide().then(function(){
                   console.log("Ocultando o loading");
                });
            })
            .error(function(data){
                console.log(data);
                
                $ionicLoading.hide().then(function(){
                   console.log("Ocultando o loading");
                });
            });
        }
    });