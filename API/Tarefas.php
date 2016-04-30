<?php
  /**
   * Classe Tarefa que tem os métodos para consultar o banco de dados.
   */
  class Tarefa
  {
    // Função contrutora, instancia a classe de retorno.
    function __construct()
    {
       $retorno = new stdClass();
    }

    function buscarTarefas($parametros)
    {
      global $conn;

      $ordem = $parametros->ordem;

      if ($ordem)
        $ordem = "ORDER BY $ordem";

      $sql = "SELECT cd_tarefa, ds_tarefa, id_finalizada
  							FROM tarefas               
              $ordem ";

  		if ($rs = $conn->Select($sql))
  		{
  			if ($rs->GetRowCount())
        {
  				$retorno->id_status  = 1;
          $retorno->ds_retorno = $rs->getArray(true);
        }
  		}
  		else
      {
        $retorno->id_status  = 0;
        $retorno->ds_retorno = "Erro ao consultar os dados.";
        $retorno->ds_log     = $conn->GetTextualError();
      }

      return json_encode($retorno);
    }

    function buscarTarefasPorCodigo($parametros)
    {
      global $conn;

      $valor = implode(",", $parametros->valor);
      $ordem = $parametros->ordem;

      echo $valor; return;
      if (!$valor)
        return "Informe o campo do valor.";

      if ($ordem)
        $ordem = "ORDER BY $ordem";

      $sql = "SELECT cd_tarefa, ds_tarefa, id_finalizada
  							FROM tarefas
               WHERE cd_tarefa IN ($valor)
              $ordem ";

  		if ($rs = $conn->Select($sql))
  		{
  			if ($rs->GetRowCount())
        {
  				$retorno->id_status  = 1;
          $retorno->ds_retorno = $rs->getArray(true);
        }
  		}
  		else
      {
        $retorno->id_status  = 0;
        $retorno->ds_retorno = "Erro ao consultar os dados.";
        $retorno->ds_log     = $conn->GetTextualError();
      }

      return json_encode($retorno);
    }

    function adicionarTarefa($parametros)
    {
      global $conn;

      $ds_tarefa = $parametros->ds_tarefa;
      $id_finalizada = $parametros->id_finalizada;

      $values = array("ds_tarefa"     => $ds_tarefa,
		                  "id_finalizada" => $id_finalizada);

 			if ($conn->Insert("tarefas", $values))
      {
        $retorno->id_status  = 1;
        $retorno->ds_retorno = "Dados inseridos.";
      }
 			else
 			{
        $retorno->id_status  = 0;
        $retorno->ds_retorno = "Erro ao inserir os dados.";
        $retorno->ds_log     = $conn->GetTextualError();
      }

      return json_encode($retorno);
    }

    function atualizarTarefa($parametros)
    {
      global $conn;

      $cd_tarefa     = $parametros->cd_tarefa;
      $ds_tarefa     = $parametros->ds_tarefa;
      $id_finalizada = $parametros->id_finalizada;

      $where = array("cd_tarefa" => $cd_tarefa);

			$values = array("ds_tarefa"     => $ds_tarefa,
		                  "id_finalizada" => $id_finalizada);

			if ($conn->Update("tarefas", $values, $where))
      {
        $retorno->id_status  = 1;
        $retorno->ds_retorno = "Dados alterados.";
      }
 			else
 			{
        $retorno->id_status  = 0;
        $retorno->ds_retorno = "Erro ao alterar os dados.";
        $retorno->ds_log     = $conn->GetTextualError();
      }

      return json_encode($retorno);
    }

    function excluirTarefa($parametros)
    {
      global $conn;

      $cd_tarefa = $parametros->cd_tarefa;

      $where = array("cd_tarefa" => $cd_tarefa);
			if ($conn->Delete("tarefas", $where))
      {
        $retorno->id_status  = 1;
        $retorno->ds_retorno = "Tarefa excluida.";
      }
 			else
 			{
        $retorno->id_status  = 0;
        $retorno->ds_retorno = "Erro ao excluir a tarefa.";
        $retorno->ds_log     = $conn->GetTextualError();
      }

      return json_encode($retorno);
    }
  }


 ?>
