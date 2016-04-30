// Cria a aplicação e inclui os modulos.
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard)
    {
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

app.controller('MainCtrl', function($scope, $ionicPopup, $ionicListDelegate, $http, APIConexaoBD, $ionicPopup, $ionicLoading) {
  var conn = APIConexaoBD;

  $scope.mostrarFinalizadas = false;
  $scope.mostrarBotaoDel = false;

  var showLoading = function () {
    $ionicLoading.show({
			template: '<ion-spinner icon="bubbles" class="spinner-stable"></ion-spinner> Carregando...'
		});
  }

  function hideLoading(res) {
		$ionicLoading.hide();
		return res;
	}

  // Funções internas do controller.
  var showAlert = function(msg) {
    $ionicPopup.alert({
      title: "Informação ao usuário",
      template: msg
    });
  };

  var testaRetornoAPI = function (retorno) {
    if (retorno.id_status == 0)
    {
      showAlert(retorno.ds_retorno);
      console.log(retorno.ds_log);
    }
    else
      return retorno.ds_retorno;
  };

  // Carrega a lista de tarefas
  var carregarTarefas = function() {
    showLoading();
    filtro = {ordem: 'ds_tarefa'};
    param = {classe: 'Tarefa', metodo: 'buscarTarefas', parametros: filtro};
    conn.buscarDados(param).success(function(data) {
      dados = testaRetornoAPI(data);

      $scope.lista = [];
      if (dados != null)
        $scope.lista = dados;

      hideLoading();
    });
  }

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
                dados = testaRetornoAPI(data);
                showAlert(dados);
                carregarTarefas();
              });
            }
            else
            {
              param = {classe: 'Tarefa', metodo: 'atualizarTarefa', parametros: item};
              conn.enviarDados(param).success(function(data) {
                dados = testaRetornoAPI(data);
                showAlert(dados);
                carregarTarefas();
              });
            }
        }},
        {text: "Cancelar"}
      ]
    });

    $ionicListDelegate.closeOptionButtons();
  };

  // Carrega todas as tarefas.
  carregarTarefas();

  // Funções do $scope.
  $scope.tarefaMarcada = function (item) {
    if (item.id_finalizada == 0)
      item.id_finalizada = 1;
    else
      item.id_finalizada = 0;

    param = {classe: 'Tarefa', metodo: 'atualizarTarefa', parametros: item};
    conn.enviarDados(param).success(function(data) {
      dados = testaRetornoAPI(data);
      showAlert(dados);
      carregarTarefas();
    });
  };

  $scope.esconderItem = function (item) {
    if (!$scope.mostrarFinalizadas)
    {
      if (item.id_finalizada == 1)
        return true;
      else
        return false;
    }

    return false;
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
      dados = testaRetornoAPI(data);
      showAlert(dados);
      carregarTarefas();
    });

    $scope.mostrarBotaoDel = false;
  };

  $scope.mostrarBotaoDeleta = function () {
    $scope.mostrarBotaoDel = !$scope.mostrarBotaoDel;
  };
});
