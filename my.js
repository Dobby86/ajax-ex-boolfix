// console.log("ciao");
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
$(document).ready(function() {
// al click

$("#cerca").click(function() {
// come resettare la pagina
    $(".container").html(" ");


    var variabileRicerca = $("#scrivi").val();

// listaFilm
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
 // sourc e compile
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var listaFilm = data.results;
// ciclooo......


        for (var i = 0; i < listaFilm.length; i++) {
            // lingue
            var ita = '<img src = "img/it.png" alt="">';
            var en = '<img src = "img/gb.png" alt="">';
            var es = '<img src = "img/es.png" alt="">';

            var listaCorrente = listaFilm [i];

            var context = {
                // cover : listaCorrente.cover_path,
                title : listaCorrente.title,
                subtitle : listaCorrente.original_title,
                language : ita,
                vote : listaCorrente.vote_average

            };

            var risultatoDaAggiungere = template(context);
            $(".film-container").append(risultatoDaAggiungere);
            console.log(risultatoDaAggiungere);
        }

    },

      error: function(richiesta, stato, errori){
    },


});
// serie tv
$.ajax({

    url: "https://api.themoviedb.org/3/search/tv",
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
 // sourc e compile
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var listaSerie = data.results;
// ciclooo......
 // primaFunzione(listaFilm);

        for (var i = 0; i < listaSerie.length; i++) {
            // lingue
            var ita = '<img src = "img/it.png" alt="">';
            var en = '<img src = "img/gb.png" alt="">';
            var es = '<img src = "img/es.png" alt="">';

            var listaCorrente = listaSerie [i];

            var context = {
                
                title : listaCorrente.name,
                subtitle : listaCorrente.original_name,
                language : ita,
                vote : listaCorrente.vote_count

            };

            var risultatoDaAggiungere = template(context);
            $(".film-container").append(risultatoDaAggiungere);
            console.log(risultatoDaAggiungere);
        }

    },

      error: function(richiesta, stato, errori){
    },


});

});
// fine ready
});
