<?php

require_once '../config/Conexao.php';

function getAllTriagem()
{
    try{
        $conn = Conexao::getConnection();
        $select = $conn->query('SELECT * FROM VW_TRIAGEM');
        echo json_encode($select->fetchAll(PDO::FETCH_ASSOC));
    }catch(PDOException $e){
        echo $e;
    }
    
}

getAllTriagem();