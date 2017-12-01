angular.module('starter.controllers', [])

.controller('AppController', function($scope, $ionicHistory, $ionicSideMenuDelegate, $window) {
    $scope.closeMenu = function() {
        $window.localStorage.setItem('cont', 'false')
        $ionicHistory.nextViewOptions({ disableAnimate: true });
        $ionicSideMenuDelegate.toggleLeft();
        $window.location.reload();
    }
    $scope.closeMenu1 = function() {
        $ionicHistory.nextViewOptions({ disableAnimate: true });
        $ionicSideMenuDelegate.toggleLeft();
    }
})

.controller('HomeController', function($scope, $http, $ionicLoading, $window, $state) {


    $scope.init = function() {
        $ionicLoading.show({
            template: 'Carregando...'
        }).then(function() {
            console.log("Exibindo loading");
        });

        // $http.get("http://www.jornalzeitgeist.com.br/api/jornal/listToApp/", { params: {} })
        //     .success(function(resposta) {
        //         console.log(resposta);
        //         $scope.jornal = resposta.data;
        //         console.log($scope.jornal)
        //         $ionicLoading.hide().then(function() {
        //             console.log("Ocultando o loading");
        //         });
        //     })
        //     .error(function(data) {
        //         console.log(data);

        //         $ionicLoading.hide().then(function() {
        //             console.log("Ocultando o loading");
        //         });
        //     });
        $http.get("http://www.jornalzeitgeist.com.br/api/jornal/listCompleteToApp/", { params: {} })
            .success(function(resposta) {
                var cont = $window.localStorage.getItem('cont')
                if (cont != 'true') {
                    console.log(resposta);
                    var index = resposta.data.jornal.length - 1;
                    var num_edicao = resposta.data.jornal[index].num_edicao_jornal;
                    $window.localStorage.setItem('num_edicao', num_edicao)
                }
                var num_edicao2 = $window.localStorage.getItem('num_edicao')

                for (i = 0; i < resposta.data.jornal.length; i++) {
                    if (resposta.data.jornal[i].num_edicao_jornal == num_edicao2) {
                        $scope.jornal = resposta.data.jornal[i];
                        console.log("bla")
                    }
                }


                console.log($scope.jornal)
                $ionicLoading.hide().then(function() {
                    console.log("Ocultando o loading");
                });
            })
            .error(function(data) {
                console.log(data);

                $ionicLoading.hide().then(function() {
                    console.log("aqui2");
                    console.log("Ocultando o loading");
                });
            });

    }
})

.controller('EdicoesController', function($scope, $http, $ionicLoading, $window, $state) {

    $scope.butao = function(edicao) {
        $window.localStorage.setItem('cont', 'true')

        $window.localStorage.setItem('num_edicao', edicao)
            //  $window.localstorage.jornal_id = edicao;
        $state.go('app.home', {}, { reload: true });
        $window.location.reload();
    }

    $scope.initEndicoes = function() {
        $ionicLoading.show({
            template: 'Carregando...'
        }).then(function() {
            console.log("Exibindo loading");
        });

        $http.get("http://www.jornalzeitgeist.com.br/api/jornal/listCompleteToApp/", { params: {} })
            .success(function(resposta) {
                console.log(resposta);
                $scope.jornal = resposta.data;
                console.log($scope.jornal)
                $ionicLoading.hide().then(function() {
                    console.log("Ocultando o loading");
                });
            })
            .error(function(data) {
                console.log(data);

                $ionicLoading.hide().then(function() {
                    console.log("aqui2");
                    console.log("Ocultando o loading");
                });
            });

    }
});