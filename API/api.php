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

	/**
	 * Validação se foram passados todos os parametros corretamente.
	 * OBRIGATÓRIO passar a Classe e o Método.
	 */
	try {
		# Verifica o tipo de requisição.
		$requisicao = $_REQUEST["ds_requisicao"];
		if (!$requisicao)
			throw new Exception("ERRO: Tipo de requisicao nao informada.");

		if ($requisicao == "POST")
		{
			$postdata = file_get_contents("php://input");
			$request = json_decode($postdata);

			$classe = $request->classe;
			$metodo = $request->metodo;
			$param = $request->parametros;
		}

		if ($requisicao == "GET")
			$param = json_decode($parametros);

		# Verifica se a classe foi informada.
		if (!$classe)
			throw new Exception("ERRO: Classe nao informada.");

		# Verifica se o método foi informada.
		if (!$metodo)
			throw new Exception("ERRO: Metodo nao informado.");

		# Cria o objeto da classe passada por parametro e chama o método informado, passando os parametros.
		$obj = new $classe();
		echo $obj->$metodo($param);
	}
	catch (Exception $e)
	{
		$retorno = new stdClass();
		$retorno->id_status  = "0";
		$retorno->ds_retorno    = utf8_encode($e->getMessage());
		echo json_encode($retorno);
	}


?>
