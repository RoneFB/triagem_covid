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
            echo json_encode($e);
        }
        /*Registra Respostas da Triagem */
    }

    function findAnswerByMatricula($matricula){
        try{
            $conn = Conexao::getConnection();
            $stmt = $conn->prepare("SELECT count(*) as qtd_registro FROM TRIAGEM TRI INNER JOIN USUARIO USU ON TRI.TRI_USU_ID = USU.USU_ID 
            WHERE  CAST(TRI.TRI_DATA AS DATE) = CAST(CURRENT_DATE() AS DATE) AND USU_MATRICULA = :matricula");
            $stmt->execute(['matricula' => $matricula]); 
            echo json_encode($stmt->fetch());
        }catch(PDOException $e){
            echo (json_encode($e));
        }
    }