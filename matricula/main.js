
    
    function getUsers() {
        $.ajax({
            method: "GET",
            dataType: 'json',
            url: "../controller/UserController.php?getUsuarios=1",
        }).done((data) => {
            data.forEach(element => {
                console.log(element)
                let usuElement = $.parseHTML(`<a id='${element.USU_ID}'>${element.USU_NOME} | ${element.USU_MATRICULA}</a>`);
                $(usuElement).on('click', () => {
                    document.getElementById("myInput").value = element.USU_NOME + " | " + element.USU_MATRICULA;
                    
                });
                $("#myDropdown").append(usuElement);

               
            });
            
        }).fail((jqXHR, status, msg) => {
            console.warn(msg)
        })

        
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      function filterFunction() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
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
    
    
    function createQrCode()
    {
        var qrElement =  $("#myInput").val().split(" | ");
      
        var userInput = qrElement[0];
        var matriculaInput = qrElement[1];
        var idInput = matriculaInput.replace(/\s/g, '');
        $('.qrcode').append($.parseHTML(`

            <div class="card border-dark mb-3 col-md-4" style="max-width: 18rem;">
                <div class="card-header">TRIAGEM COVID - ALLTEC</div>
                <div class="card-body text-dark">
                    <div id="qrcode-${idInput}"></div>
                </div>
                <div class="card-footer" id="footer-${idInput}"></div>
            </div>
        `))
        var qrcode = new QRCode("qrcode-"+idInput, {
            text: '{"nome":'+ '"'+userInput + '",\n' + '"matricula":'+'"'+matriculaInput+'"}',
            width: 128,
            height: 128,
            colorDark: "black",
            colorLight: "white",
            correctLevel : QRCode.CorrectLevel.H
        });
        $('#footer-'+idInput).append($.parseHTML(`<span>Nome: ${userInput}<span>
            <span>Matricula: ${matriculaInput}</span>`))

        $("input").val(""); 
    }
    
    $("#imprimir").on('click', () => {
        $(".container").remove();
        print();
    });

    $("#cadastrar").on('click', () => {
        var nome = $("#nome").val();
        var matricula = $("#matricula").val();

        $.ajax({
            method: "POST",
            dataType: 'html',
            url: "../controller/UserController.php",
            data: {"nome": nome, "matricula" : matricula}
        }).done((data) => {
            console.log(data)
        }).fail((jqXHR, status, msg) => {
            console.warn(msg)
        })
    })