<?php
  /**
   * Classe Tarefa que tem os métodos para consultar o banco de dados.
   */
  class Tarefa
  {
    function retornaMensagem(){
      return "Classe Tarefa criada.";
    }

    function buscarTarefas($parametros)
    {
      global $conn;

      $campo = $parametros->campo;
      $valor = $parametros->valor;

      $sql = "SELECT cd_tarefa, ds_tarefa, id_finalizada
  							FROM tarefas
               WHERE $campo = $valor
  						 ORDER BY cd_tarefa ";
  		if ($rs = $conn->Select($sql))
  		{
  			if ($rs->GetRowCount())
  				return json_encode($rs->getArray(true));
  		}
  		else
  			return "Erro ao consultar os dados. " . $conn->GetTextualError();
    }
  }


 ?>
