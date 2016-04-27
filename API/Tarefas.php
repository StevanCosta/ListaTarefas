<?php
  /**
   * Classe Tarefa que tem os métodos para consultar o banco de dados.
   */
  class Tarefa
  {
    function retornaMensagem()
    {
      return "Classe Tarefa criada.";
    }

    function buscarTarefas($parametros)
    {
      global $conn;

      $campo = $parametros->campo;
      $valor = $parametros->valor;

      $sql = "SELECT cd_tarefa, ds_tarefa, id_finalizada
  							FROM tarefas
               WHERE true ";

      if (strlen($campo))
        $sql .= "AND $campo = $valor";

  		$sql .= "ORDER BY cd_tarefa ";
  		if ($rs = $conn->Select($sql))
  		{
  			if ($rs->GetRowCount())
  				return json_encode($rs->getArray(true));
  		}
  		else
  			return "Erro ao consultar os dados. " . $conn->GetTextualError();
    }

    function adicionarTarefa($parametros)
    {
      global $conn;

      $ds_tarefa = $parametros->ds_tarefa;
      $id_finalizada = $parametros->id_finalizada;

      $values = array("ds_tarefa"     => $ds_tarefa,
		                  "id_finalizada" => $id_finalizada);

 			if ($conn->Insert("tarefas", $values))
 				echo "Dados inseridos.";
 			else
 				echo "Erro ao inserir os dados." . $conn->GetTextualError();
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
				echo "Dados alterados.";
			else
				echo "Erro ao alterar os dados." . $conn->GetTextualError();
    }

    function excluirTarefa($parametros)
    {
      global $conn;

      $cd_tarefa = $parametros->cd_tarefa;

      $where = array("cd_tarefa" => $cd_tarefa);
			if ($conn->Delete("tarefas", $where))
				echo "Tarefa excluida.";
			else
				echo "Erro ao excluir a tarefa." . $conn->GetTextualError();
    }
  }


 ?>
