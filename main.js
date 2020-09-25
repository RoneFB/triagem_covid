
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
            trocarView(question.id)
            $(navElement).addClass("active");
        })
        $('.tab').append(navElement)

        /* Content */
        let contentElement = $.parseHTML(` <div id="${question.id}" class="tabcontent display1">
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


        /* Enviar para o Banco de Dados */
        if(question.id === 10){
            var btnEnviar = $.parseHTML("<button class='btn btn-success'>Enviar Triagem</button>")

            $(btnEnviar).click(()=>{
                var idUsuario = $("#id").val();
                var matricula = $("matricula").val();

                if(verificarRespostas(questions) == true){
                    $.ajax({
                        method: "POST",
                        dataType: 'HTML',
                        url: "controller/AnswerController.php",
                        data: {"perguntas": questions, "idUsuario" : parseInt(idUsuario)}
                    }).done((data) => {
                        console.log(data)
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

formCreate();

/* qrcode */

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

            $.ajax({
                method: "GET",
                dataType: 'JSON',
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
        })
    }
}).catch(function (e) {
    console.error(e);
  });


function verificarUsuario($nome, matricula){
    $.ajax({
        method: "GET",
        dataType: 'HTML',
        url: "controller/UserController.php?VerifyUser=1",
        data: {"nome": nome, "matricula": matricula}
    }).done((data) => {
        console.log(data)
    }).fail((jqXHR, status, msg) => {
        console.warn(msg)
    })
}