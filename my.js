// console.log("ciao");
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
$(document).ready(function() {
// al click
$("button").click(function() {

    $(".container").html("");     
    var variabileRicerca = $("#scrivi").val();


$.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    dataType: "json",
    data: {
        api_key: "76dafb6359bcac21006df98494394fce",
        language: "it-IT",
        query: variabileRicerca,
    },
    // handlebars
    success : function (data) {

        console.log(data);

    var source = $("#entry-template").html();
     var template = Handlebars.compile(source);

        var listaFilm = data.results;

        for (var i = 0; i < listaFilm.length; i++) {
            var listaCorrente = listaFilm [i];

            var context = {

                title : listaCorrente.title,
                subtitle : listaCorrente.original_title,
                language :listaCorrente.original_language,
                voto : listaCorrente.vote_count

            };
            var risultatoDaAggiungere = template(context);
            $(".film-container").append(risultatoDaAggiungere);
            console.log(risultatoDaAggiungere);
        }

    },
      error: function(richiesta, stato, errori){
    }

});

});
});
