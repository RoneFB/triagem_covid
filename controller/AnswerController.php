<?php 
require_once "../dao/Answer.php";
require_once "../dao/User.php";

if(isset($_POST['perguntas']) && isset($_POST['idUsuario'])){
   $perguntas = json_encode($_POST['perguntas']);
   $idUsuario = json_encode((int) $_POST["idUsuario"]);


    if($perguntas != null || $perguntas != []){ 
        
        setAnswerMatriculado(intval($idUsuario), $_POST['perguntas']);
    } 
}
