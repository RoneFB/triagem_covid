<?php

require_once '../config/Conexao.php';

function getAllPerguntas()
{
    try{
        $conn = Conexao::getConnection();
        $select = $conn->query('SELECT * FROM PERGUNTA');
        echo json_encode($select->fetchAll(PDO::FETCH_ASSOC));
    }catch(PDOException $e){
        echo $e;
    }
    
}

getAllPerguntas();