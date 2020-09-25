<?php
require_once '../config/Conexao.php';

    
    function setAnswerMatriculado($idUsuario, $perguntas){
        $conn = Conexao::getConnection();
        /* Registra Triagem */
        try{
            $triagem = $conn->prepare('INSERT INTO TRIAGEM(TRI_USU_ID, TRI_DATA) VALUES(?,?)');
            $triagem->execute([$idUsuario, date("Y-m-d H:i:s")]);
            $idTriagem = $conn->lastInsertId();
            echo $idTriagem;
          
            foreach ($perguntas  as $key => $value) {
               $respostas = $conn->prepare('INSERT INTO RESPOSTAS(RESP_TRI_ID, RESP_PER_ID, RESP_PERGUNTA) values (?,?,?)');
               $respostas->execute([$idTriagem, (int) $value['id'], $value['answer']]);
            }
            
        }catch(PDOException $e){
            echo $e;
        }
        /*Registra Respostas da Triagem */
    }
