angular.module("starter").service("APIConexaoBD", function($http) {

  // Define a várivael quem tem a URL da API que faz a conexão com o banco de dados.
  this.api = "http://localhost/Projetos/ListaTarefas/API/api.php";
  this.config = { timeout: 30000 };

  this.buscarDados = function (dados) {
    var url = this.api + "?ds_requisicao=GET";
    return $http.get(url, {params: dados}, this.config);
  };

  this.enviarDados = function (dados) {
    var url = this.api + "?ds_requisicao=POST";
    return $http.post(url, dados, this.config);
  };
});
