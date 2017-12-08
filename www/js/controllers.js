angular.module('starter.controllers', [])

  .controller('AppController', function ($scope, $ionicHistory, $ionicSideMenuDelegate, $window) {

    $scope.showLast = function () {
      $window.localStorage.setItem('ultimaEdicao', 'true')
      $ionicHistory.nextViewOptions({disableAnimate: true});
      $ionicSideMenuDelegate.toggleLeft();
      $window.location.reload();
    };

    $scope.showList = function () {
      $ionicHistory.nextViewOptions({disableAnimate: true});
      $ionicSideMenuDelegate.toggleLeft();
    }
  })

  .controller('HomeController', function ($scope, $http, $ionicLoading, $window) {
    $scope.jornal = {};
    $scope.listaJornal = [];

    $scope.init = function () {
      $ionicLoading.show({
        template: 'Carregando...'
      }).then(function () {
        console.log("Exibindo loading");
      });

      getListaJornal();
    };

    $scope.doRefresh = function () {
      getListaJornal();
    };

    function getListaJornal() {
      $http.get("http://www.jornalzeitgeist.com.br/api/jornal/listCompleteToApp/", { params: {} })
        .success(function (resposta) {
          $scope.listaJornal = resposta.data.jornal;
          showJornal();
        }).error(function (data) {
        console.log(data);
      }).finally(function () {
        $ionicLoading.hide().then(function () {
          console.log("Ocultando o loading");
        });

        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    function showJornal() {
      var ultimaEdicao = $window.localStorage.getItem('ultimaEdicao');

      if (ultimaEdicao == null || ultimaEdicao == 'true') {
        $scope.jornal = $scope.listaJornal[0];
      } else {
        var numEdicaoExibida = $window.localStorage.getItem('numEdicao');

        $scope.jornal = $scope.listaJornal.filter(function (jornal) {
          return jornal.num_edicao_jornal == numEdicaoExibida;
        })[0];
      }

      $ionicLoading.hide().then(function () {
        console.log("Ocultando o loading");
      });
    }
  })

  .controller('EdicoesController', function ($scope, $http, $ionicLoading, $window, $state) {
    $scope.listaJornal = [];

    $scope.initEdicoes = function () {
      $ionicLoading.show({
        template: 'Carregando...'
      }).then(function () {
        console.log("Exibindo loading");
      });

      getListaJornal();
    };

    $scope.vizualizarEdicao = function (edicao) {
      $window.localStorage.setItem('ultimaEdicao', 'false');
      $window.localStorage.setItem('numEdicao', edicao);
      $state.go('app.home', {}, { reload: true });
      $window.location.reload();
    };

    $scope.doRefresh = function () {
      getListaJornal();
    };

    function getListaJornal() {
      $http.get("http://www.jornalzeitgeist.com.br/api/jornal/listCompleteToApp/", { params: {} })
        .success(function (resposta) {
          $scope.listaJornal = resposta.data.jornal;
        }).error(function (data) {
        console.log(data);
      }).finally(function () {
        $ionicLoading.hide().then(function () {
          console.log("Ocultando o loading");
        });

        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  });
