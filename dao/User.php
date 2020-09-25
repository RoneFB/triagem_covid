<?php 
require_once "../config/Conexao.php";


function matricula($nome, $matricula)
{
    try{
        $conn = Conexao::getConnection();
        $insert = "INSERT INTO Usuario(usu_nome, usu_matricula) values(?,?)";
        $stmt = $conn->prepare($insert);
        $stmt->execute([$nome, $matricula]);
    }catch(PDOException $e){
        echo "Não foi possivel guardar usuário".$e;
    }
    
}

function getAllUsers(){
    try{
        $conn = Conexao::getConnection();
        $select = $conn->query('SELECT * FROM USUARIO');   
        echo json_encode($select->fetchAll(PDO::FETCH_ASSOC));
    }catch(PDOException $e){
        echo ($e);
    }
}


function findUserByName($name){
    try{
        $conn = Conexao::getConnection();
        $select = $conn->query('SELECT * FROM USUARIO WHERE USU_NOME = '.$name);   
        echo json_encode($select->fetch());
    }catch(PDOException $e){
        echo ($e);
    }
}

function findUserByMatricula($matricula){
    try{
        $conn = Conexao::getConnection();
        $select = $conn->query('SELECT * FROM USUARIO WHERE USU_MATRICULA = '.$matricula);   
        echo json_encode($select->fetch());
    }catch(PDOException $e){
        echo ($e);
    }
}