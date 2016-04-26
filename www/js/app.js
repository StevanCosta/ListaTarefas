// Cria a aplicação e inclui os modulos.
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('MainCtrl', function($scope, $ionicPopup, $ionicListDelegate, $http, APIConexaoBD, $ionicPopup) {
  var conn = APIConexaoBD;

  $scope.mostrarFinalizadas = false;
  $scope.mostrarBotaoDel = false;

  // Carrega a lista de tarefas
  var carregarTarefas = function() {
    fil = {campo: 'cd_tarefa', valor: 27};
    parametros = {classe: 'Tarefa', metodo: 'buscarTarefas', filtros: fil};
    conn.buscar(parametros).success(function(data) {
      console.log(data);
      $scope.lista = [];
      if (data != '')
        $scope.lista = data;
    });
  }

  carregarTarefas();

  function abrePopup(item) {
    $scope.data = {};
    $scope.data.novaTarefa = item.ds_tarefa;

    $ionicPopup.show({
      title: "Nova Tarefa",
      scope: $scope,
      template: "<input type='text' placeholder='Nova Tarefa' autofocus=true ng-model='data.novaTarefa'>",
      buttons: [
        {text: "Salvar",
        onTap: function(e) {
            item.ds_tarefa = $scope.data.novaTarefa;
            item.id_finalizada = false;

            if (item.cd_tarefa == null)
            {
              conn.adicionarTarefas(item).success(function(data) {
                $ionicPopup.alert({
                  title: "Informação ao usuário",
                  template: data
                });

                carregarTarefas();
              });
            }
            else
            {
              conn.atualizarTarefa(item).success(function(data) {
                $ionicPopup.alert({
                  title: "Informação ao usuário",
                  template: data
                });

                carregarTarefas();
              });
            }
        }},
        {text: "Cancelar"}
      ]
    });

    $ionicListDelegate.closeOptionButtons();
  };

  $scope.tarefaMarcada= function (item) {
    item.finalizada = !item.finalizada;
  };

  $scope.esconderItem = function (item) {
    return item.finalizada && !$scope.mostrarFinalizadas;
  };

  $scope.adicionarItem = function() {
    var item = {};
    abrePopup(item, true);
  };

  $scope.alterarItem = function (item) {
    abrePopup(item, false);
  };

  $scope.removerItem = function (item) {
    conn.removerTarefa(item).success(function(data) {
      $ionicPopup.alert({
        title: "Informação ao usuário",
        template: data
      });

      carregarTarefas();
    });

    $scope.mostrarBotaoDel = false;
  };

  $scope.mostrarBotaoDeleta = function () {
    $scope.mostrarBotaoDel = !$scope.mostrarBotaoDel;
  };
});
