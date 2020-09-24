<?php 
require_once "../dao/User.php";



if(isset($_POST['nome'])){
  $dados = json_encode($_POST);
    $dados = json_decode($dados);
    if($dados->nome != "" && $dados->matricula != ""){
    
        matricula($dados->nome, $dados->matricula);
    }  
}


if(isset($_GET['getUsuarios'])){
    print_r(getAllUsers());
}