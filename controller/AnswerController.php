<?php 
require_once "../dao/Answer.php";


$perguntas = json_encode($_POST['perguntas']);
if($perguntas != null || $perguntas != []){
    print_r($perguntas);
    
}