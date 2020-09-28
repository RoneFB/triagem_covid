
formCreate();

/* qrcode */
var visit = false;
const scanner = new Instascan.Scanner({
    video: document.getElementById('webcam')
})

Instascan.Camera.getCameras().then(cameras => {
    console.log(cameras)
    if(cameras.length > 0){
        scanner.mirror = false;
        scanner.start(cameras[1])
        scanner.addListener('scan', content => {
            var nomeJson = JSON.parse(content).nome
            var matriculaJson = JSON.parse(content).matricula
            $("#webcam").remove();
            
            scanner.stop(cameras[1])

            getUser(nomeJson, matriculaJson)
        })
    }
}).catch(function (e) {
    console.error(e);
  });


  $("#semQRCODE").on('click', function(){
      
      $("#qrcod").append($.parseHTML(`<div class="dropdown">
        <div id="inputDropDown" class="dropdown-content">
        <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
        
    </div>`));
        $.ajax({
            method: "GET",
            dataType: 'json',
            url: "./controller/UserController.php?getUsuarios=1",
        }).done((data) => {
            data.forEach(element => {
                console.log(element)
                let usuElement = $.parseHTML(`<a id='${element.USU_ID}'>${element.USU_NOME} - ${element.USU_MATRICULA}</a>`);
                $(usuElement).on('click', () => {
                    document.getElementById("myInput").value = element.USU_NOME + " - " + element.USU_MATRICULA;
                    getUser(element.USU_NOME, element.USU_MATRICULA);
                    document.getElementById("inputDropDown").classList.toggle("hidden");
                });
                $("#inputDropDown").append(usuElement);
            });
            
        }).fail((jqXHR, status, msg) => {
            console.warn(msg)
        })
        document.getElementById("inputDropDown").classList.toggle("show");
  })




function filterFunction() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("inputDropDown");
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
          txtValue = a[i].textContent || a[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
          } else {
            a[i].style.display = "none";
          }
        }
      }

function formCreate(){

    var questions = [
        {
            id: 1,
            question : "Você teve contato próximo com alguma pessoa testada positiva para COVID-19 nos últimos 14 dias ?",
            answer : ""
        },
        {
            id: 2,
            question : "Febre",
            answer : ""
        },
        {
            id: 3,
            question : "Calafrios",
            answer : ""
        },
        {
            id: 4,
            question : "Falta de ar",
            answer : ""
        },
        {
            id: 5,
            question : "Tosse",
            answer : ""
        },
        {
            id: 6,
            question : "Dor de garganta",
            answer : ""
        },
        {
            id: 7,
            question : "Dor de cabeça",
            answer : ""
        },
        {
            id: 8,
            question : "Dor no corpo",
            answer : ""
        },
        {
            id: 9,
            question : "Perda de olfato e/ou paladar",
            answer : ""
        },
        {
            id: 10,
            question : "Diarreia(por motivo desconhecido)",
            answer : ""
        }
    ]
    

    questions.forEach(question => {
        /* NavBar */
        let navElement = $.parseHTML(`<button class="tablinks">Pergunta ${question.id}</button>`)
       
        if (question.id == 1) $(navElement).addClass("active");
      
        $(navElement).on('click', () => {
            trocarView("ques-"+question.id)
            $(navElement).addClass("active");
        })
        $('.tab').append(navElement)

        /* Content */
        let contentElement = $.parseHTML(` <div id="ques-${question.id}" class="tabcontent display1">
            <h3>${question.question}</h3></div>`);

        if (question.id == 1) $(contentElement).css("display", "block")
        else $(contentElement).css("display", "none")
      
        $('#app').append(contentElement);


        /* Form */

        let form = $.parseHTML(`
        <div class="form-check-inline" id="radio-${question.id}">
            <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" name="opt-${question.id}" value="Não">Não
            </div>
            <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" name="opt-${question.id}" value="Sim">Sim
            </div>
        </div>`)

        $(form).on('change', "input[name=opt-"+question.id+"]", function() {   
                         
            question.answer = this.value;
            if(question.answer != ""){
                question.answer == "Não" ? $(navElement).css('background-color', "rgb(88, 104, 252)") : $(navElement).css('background-color', "rgb(243, 57, 0)")
            }
        });

        if(question.id >= 2){
            $(contentElement).prepend($.parseHTML(`<h3>Você apresentou este sintomas nas ultimas 24 Horas ?</h3>`))
        }

    
        var idUsuario = $("#id").val();
        urlPost = "controller/AnswerController.php";
        dataPost = {"perguntas": questions, "idUsuario" : parseInt(idUsuario)}
      
        /* Enviar para o Banco de Dados */
        if(question.id === 10){
            var btnEnviar = $.parseHTML("<button class='btn btn-success'>Enviar Triagem</button>")
           
            var nome = $("#nome").val();
            var urlPost = "";
          
            $(btnEnviar).click(()=>{
                if($("#chkVisitante").is(":checked")){
                    urlPost = "controller/VisitanteController.php";
                    dataPost = {"perguntas": questions, "nome" : $("#nome").val(), "matricula": $("#matricula").val()}
                }
           
                if(verificarRespostas(questions) == true){
                    $.ajax({
                        method: "POST",
                        dataType: 'HTML',
                        url: urlPost,
                        data: dataPost
                    }).done((data) => {
                        location.reload();
                    }).fail((jqXHR, status, msg) => {
                        console.warn(msg)
                    })
                }
            })
            $(form).append(btnEnviar)
        }

        $(contentElement).append(form);
     
    });

}


$("#chkVisitante").on('click',  function(){
    var inputNome = $("#nome");
    var inputMatricula= $("#matricula");
    if($("#chkVisitante").is(":checked")){
        $("#webcam").addClass("hidden");
        $( "#lblNome" ).removeClass( "invisible" )
        $( "#lblMatricula" ).removeClass( "invisible" )
        $(inputNome).prop('type', 'text');
        $(inputMatricula).prop('type', 'text');
    }else{
         $("#webcam").removeClass("hidden");
         $( "#lblNome" ).addClass( "invisible" )
         $( "#lblMatricula" ).addClass( "invisible" )
         $(inputNome).prop('type', 'hidden');
        $(inputMatricula).prop('type', 'hidden');
    }
   
    
   

    var btnEnviarVisitante = $.parseHTML(`<button class="btn btn-success">Enviar Visitante</button>`)
    
    $(btnEnviarVisitante).click(function(){
        addVisitante($(inputNome).val(),$(inputMatricula).val())
    })

    $('#qrcode').append(btnEnviarVisitante)

  
    
})
function getUser(nomeJson, matriculaJson){
    $.ajax({
        method: "GET",
        dataType: 'json',
        url: "controller/UserController.php?VerifyUser=1",
        data: {"nome": nomeJson, "matricula": matriculaJson}
    }).done((data) => {
        $("#id").val(data.USU_ID);
        $("#nome").val(data.USU_NOME);
        $("#matricula").val(data.USU_MATRICULA);
        $("#qrcod .card-body").append($.parseHTML(`<h3 class="mt-4">Nome: ${data.USU_NOME}</h3>`))
        $("#qrcod .card-body").append($.parseHTML(`<h3 class="mt-4">Matricula: ${data.USU_MATRICULA}</h3>`))
    }).fail((jqXHR, status, msg) => {
        console.warn(msg)
    })
}
function verificarRespostas(questions){
    $(".alert").remove();
    var questionsNull = []
    questions.forEach(question => {
        if(question.answer == ""){
            questionsNull.push(question)
            $("#10").append($.parseHTML(`<div class='alert alert-danger'>Atenção a pergunta ${question.id} não foi respondida!</div>`))
        }
    })
    console.log(questionsNull.length == 0)
   return questionsNull.length == 0
   
}

function trocarView(element) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(element).style.display = "block";
    //evt.currentTarget.className += " active";

    }


function verificarUsuario($nome, matricula){
    $.ajax({
        method: "GET",
        dataType: 'HTML',
        url: "controller/UserController.php?VerifyUser=1",
        data: {"nome": nome, "matricula": matricula}
    }).done((data) => {
        console.log(data)
    }).fail((jqXHR, status, msg) => {
        console.log(msg)
    })
}



