<?php 
require_once "../dao/Visitante.php";
require_once "../dao/User.php";

if(isset($_POST['perguntas']) && isset($_POST['nome']) && isset($_POST['matricula'])){
   $perguntas = json_encode($_POST['perguntas']);
   $nome = json_encode((int) $_POST["nome"]);
   $matricula = json_encode((int) $_POST["matricula"]);
    if($perguntas != null || $perguntas != []){ 
        
        setAnswerVisitante($_POST['nome'], $_POST["matricula"], $_POST['perguntas']);
    } 
}
