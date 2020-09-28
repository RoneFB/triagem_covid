<?php
require_once '../config/Conexao.php';

    
    function setAnswerVisitante($nome, $matricula, $perguntas){
        $conn = Conexao::getConnection();
        /* Registra Triagem */
        try{

            $usuario = $conn->prepare('INSERT INTO Usuario(usu_nome, usu_matricula) values(?,?)');
            $usuario->execute([$nome, $matricula]);
            $idUsuario = $conn->lastInsertId();

            $triagem = $conn->prepare('INSERT INTO TRIAGEM(TRI_USU_ID, TRI_DATA) VALUES(?,?)');
            $triagem->execute([$idUsuario, date("Y-m-d H:i:s")]);
            $idTriagem = $conn->lastInsertId();
          
            foreach ($perguntas  as $key => $value) {
               $respostas = $conn->prepare('INSERT INTO RESPOSTAS(RESP_TRI_ID, RESP_PER_ID, RESP_PERGUNTA) values (?,?,?)');
               $respostas->execute([$idTriagem, (int) $value['id'], $value['answer']]);
            }
            
        }catch(PDOException $e){
            echo $e;
        }
        /*Registra Respostas da Triagem */
    }
