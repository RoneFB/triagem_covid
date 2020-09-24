<!DOCTYPE html>
<html lang="pt-bt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador Cartão Triagem COVID - ALLTEC</title>
    <link rel="stylesheet" href="../src/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="qrcode.js"></script>
    </head>
    <body>
        <div class="container" id="cabecalho">
            <div class="row mt-4">
                <div class="col">
                    <label for="nome">Nome: </label><input class="form-control" type="text" id="nome" value="">
                </div>   
                <div class="col">
                    <label for="matricula">Matricula: </label><input class="form-control" type="text" id="matricula" value="">
                </div> 
            </div>
             <button class="btn btn-primary mt-4" id="cadastrar">Cadastrar Usuário</button>
             
        </div>
        
        
        <div class="qrcode row mt-4"></div>
        <div class="container">
        <div class="dropdown">
            <button onclick="getUsers()" class="btn btn-info mt-4">Usuários Cadastrados</button>
            <div id="myDropdown" class="dropdown-content">
            <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
              
        </div>
        </div>
            <button class="btn btn-success mt-4" onClick="createQrCode()">Gerar QR Code</button>
            <button id="imprimir" class="btn btn-danger mt-4">Imprimir</button>
        </div>
        <script src="../src/js/jquery-3.5.1.min.js"></script>
    </body>
    <script src="main.js"></script>
    <style>
     
    </style>
</html>