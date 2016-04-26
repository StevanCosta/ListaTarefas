angular.module("starter").service("APIConexaoBD", function($http) {

  // Define a várivael quem tem a URL da API que faz a conexão com o banco de dados.
  this.api = "http://localhost/Projetos/ListaTarefas/API/api.php";
  this.config = { timeout: 30000 };

  this.buscar = function (dados) {
    return $http.get(this.api, {params: dados}, this.config);
  };

  this.adicionarTarefas = function (item) {
    var url = this.api + "?acao=I&tabela=tarefas";
    return $http.post(url, {dados: item}, this.config);
  };

  this.atualizarTarefa = function (item) {
    var url = this.api + "?acao=A&tabela=tarefas";
    return $http.post(url, {dados: item}, this.config);
  };

  this.removerTarefa = function (item) {
    var url = this.api + "?acao=A&tabela=tarefas";
    return $http.post(url, {dados: item}, this.config);
  };
});
