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

  var showAlert = function(msg) {
    $ionicPopup.alert({
      title: "Informação ao usuário",
      template: msg
    });
  };

  var testaRetornoAPI = function (retorno) {
    if (retorno.id_status == 0)
      showAlert(retorno.ds_retorno);
    else
      return retorno;
  };

  // Carrega a lista de tarefas
  var carregarTarefas = function() {
    filtro = {};
    param = {classe: 'Tarefa', metodo: 'buscarTarefas', parametros: filtro};
    conn.buscarDados(param).success(function(data) {
      dados = testaRetornoAPI(data);

      $scope.lista = [];
      if (dados != null)
        $scope.lista = dados;
    });
  }

  carregarTarefas();

  var abrePopup = function (item) {
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
            item.id_finalizada = 0;

            if (item.cd_tarefa == null)
            {
              param = {classe: 'Tarefa', metodo: 'adicionarTarefa', parametros: item};
              conn.enviarDados(param).success(function(data) {
                showAlert(data);
                carregarTarefas();
              });
            }
            else
            {
              param = {classe: 'Tarefa', metodo: 'atualizarTarefa', parametros: item};
              conn.enviarDados(param).success(function(data) {
                showAlert(data);
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
    param = {classe: 'Tarefa', metodo: 'excluirTarefa', parametros: item};
    conn.enviarDados(param).success(function(data) {
      showAlert(data);
      carregarTarefas();
    });

    $scope.mostrarBotaoDel = false;
  };

  $scope.mostrarBotaoDeleta = function () {
    $scope.mostrarBotaoDel = !$scope.mostrarBotaoDel;
  };
});
