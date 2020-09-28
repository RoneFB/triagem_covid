<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="src/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="src/css/styles.css">
</head>
<body>
    <div id="app">
        <div id="qrcod" class="card">
          <video id="webcam"></video>
          <form class="form-inline col-sm-8">
            <input type="hidden" name="id" id="id">
            <label id="lblNome" for="nome" class="invisible">Nome: </label>
            <input type="hidden" name="nome" id="nome" class="form-control">
            <label id="lblMatricula" for="matricula" class="invisible"> Matricula: </label>
            <input type="hidden" name="matricula" id="matricula" class="form-control">
          </form>
          <div class="card-body">
            
          </div>
        </div>
        <div class="tab">
        </div>
        <footer>
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link" href="/triagem_covid/matricula">Criar QR-CODE</a>
                        <a class="nav-item nav-link" href="/triagem_covid/tabela">Tabela de Registros</a>
                     
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="chkVisitante" value="Visitante">
                            <label class="form-check-label" for="chkVisitante">Visitante</label>
                        </div>
                        <button class="btn btn-success" id="semQRCODE">SEM QR-CODE</button>
                    </div>
                </div>
            </nav>
        </footer>
    </div>

    
    <script src="./src/js/jquery-3.5.1.min.js"></script>
    <script src="./src/bootstrap/js/bootstrap.min.js"></script>
    <script src="./src/js/instascan.min.js"></script>
    <script src="./main.js"></script>
    
</body>
</html>
