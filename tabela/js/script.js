
$(document).ready(function() {
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "getTriagem.php"
    }).done((data) => {
        console.log(data)
        rows_tabela(data)
    }).fail((jqXHR, status, msg) => {
        console.warn(msg)
    })

    $.ajax({
        method: "GET",
        dataType: "json",
        url: "getPerguntas.php"
    }).done((data) => {
        console.log(data)
        colunas_tabela(data)
    }).fail((jqXHR, status, msg) => {
        console.warn(msg)
    })

    
} );

function colunas_tabela(data){
    var colElements = $("[col-elements]");
   
    var outhers_columns = $.parseHTML(`<th>Nome</th>
    <th>Matricula</th>
    <th>Data</th>`);
    $(colElements).append(outhers_columns);

    data.forEach(element => {
        $(colElements).append($.parseHTML(`<th>${element.PER_PERGUNTA}</th>`))    
    });

    $('#example').DataTable( {
        dom: 'Bfrtip',
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 linhas', '25 linhas', '50 linhas', 'Mostrar todos' ]
        ],
        buttons: [
            {
                extend: 'pageLength',
                text: 'Quantidade de Linhas'
            },{
                extend: 'csv',
                text: 'Export CSV'
            },{
                extend: 'excel',
                text: 'Export Excel'
            },{
                extend: 'print',
                text: 'Imprimir'
            },{
                extend: 'copy',
                text: 'Copiar'
            }
        ],
        
    } );
}   

function rows_tabela(data){
    var rowsElements = $("[rows-elements]");

    data.forEach(element => {
        if(element.PER_ID == 1 ){
            $(rowsElements).append($.parseHTML(`<tr id="${element.TRI_ID}"></tr>`));
                $("#"+element.TRI_ID).append($.parseHTML(`
                <td>${element.USU_NOME}</td>
                <td>${element.USU_MATRICULA}</td>
                <td>${element.TRI_DATA}</td>
            `))
        }
   
        
        $("#"+element.TRI_ID).append($.parseHTML(`<td>${element.RESP_PERGUNTA}</td>`))    
    });
}