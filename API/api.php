<?php
	session_start();

	include("lib/jaguar/jaguar.inc.php");
	include("Tarefas.php");

	JDBAuth::SetValidated();
	error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_WARNING & ~E_DEPRECATED);

	if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
  }

	//echo "Classe: $classe - Metodo: $metodo - Filtros: $filtros";

	$param = json_decode($filtros);
	$obj = new $classe();
	echo $obj->$metodo($param);

	/*

	if (strlen($acao))
	{
		if ($acao == "I")
		{
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);

			$dados = $request->dados;

			if (!$dados->id_finalizada)
			  $id_finalizada = 0;
			else
				$id_finalizada = 1;

			$values = array("ds_tarefa"     => $dados->ds_tarefa,
		                  "id_finalizada" => $id_finalizada);

			if ($conn->Insert($tabela, $values))
				echo "Dados inseridos.";
			else
				echo "Erro ao inserir os dados." . $conn->GetTextualError();
		}

		if ($acao == "A")
		{
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);

			$dados = $request->dados;

			if (!$dados->id_finalizada)
			  $id_finalizada = 0;
			else
				$id_finalizada = 1;

			$where = array("cd_tarefa" => $dados->cd_tarefa);

			$values = array("ds_tarefa"     => $dados->ds_tarefa,
		                  "id_finalizada" => $id_finalizada);

			if ($conn->Update($tabela, $values, $where))
				echo "Dados alterados.";
			else
				echo "Erro ao alterar os dados." . $conn->GetTextualError();
		}

		if ($acao == "E")
		{
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);

			$dados = $request->dados;

			$where = array("cd_tarefa" => $dados->cd_tarefa);
			if ($conn->Delete($tabela, $where))
				echo "Tarefa excluida.";
			else
				echo "Erro ao excluir a tarefa." . $conn->GetTextualError();
		}
	}
	else
		echo "AÇÃO não informada.";
*/

?>
