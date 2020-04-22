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
            //parte simile
            var originalLanFilm = listaCorrente.original_language;

            var valoreProprietàLinguaggio = "";

            console.log(originalLanFilm);

            // come lo valorizzo?
            if (originalLanFilm == "en") {
                valoreProprietàLinguaggio = '<img src = "img/gb.png" alt="">';
            }else if (originalLanFilm == "it"){
                valoreProprietàLinguaggio = '<img src = "img/it.png" alt="">';
            }else if (originalLanFilm == "es"){
                valoreProprietàLinguaggio = '<img src = "img/es.png" alt="">';
            }
             else {
                valoreProprietàLinguaggio = originalLanFilm;
            }

            var context = {

                title : listaCorrente.title,
                subtitle : listaCorrente.original_title,
                language : listaCorrente.original_language,
                vote : listaCorrente.vote_average

            };

            var risultatoDaAggiungere = template(context);
            $(".film-container").append(risultatoDaAggiungere);
            // console.log(risultatoDaAggiungere);
        }

    },

      error: function(richiesta, stato, errori){
    },


});
// serie tv...................
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
// testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt



        for (var i = 0 ;  i < listaSerie.length; i++) {
            // lingue
            var italiano = '<img src = "img/it.png" alt="">';
            var inglese = '<img src = "img/gb.png" alt="">';
            var spagnolo = '<img src = "img/es.png" alt="">';

            var listaCorrenteSerie = listaSerie [i];

            var originalLan = listaCorrenteSerie.original_language;

 // listaCorrenteSerie.original_language;

            var valoreProprietàLinguaggio = "";

            console.log(originalLan);

            // come lo valorizzo?
            if (originalLan == "en") {
                valoreProprietàLinguaggio = '<img src = "img/gb.png" alt="">';
            }else if (originalLan == "it"){
                valoreProprietàLinguaggio = '<img src = "img/it.png" alt="">';
            }else if (originalLan == "es"){
                valoreProprietàLinguaggio = '<img src = "img/es.png" alt="">';
            }
             else {
                valoreProprietàLinguaggio = originalLan;
            }

            var context = {

                title : listaCorrenteSerie.name,
                subtitle : listaCorrenteSerie.original_name,
                language : valoreProprietàLinguaggio,
                vote : listaCorrenteSerie.vote_count,

                // stelline : generaStelle(votoCorretto)

            };

            var risultatoDaAggiungere = template(context);

            $(".film-container").append(risultatoDaAggiungere);
            // console.log(risultatoDaAggiungere);
        }
    // }
// fine faseprima
    },

      error : function(richiesta, stato, errori){
    },


});


});
// fine ready
});
// funzione per le stelline
function generaStelle (voto){

    var stelleTot = " ";

    for (var i = 0; i < voto; i++){

        stelleTot += '<i class="fas fa-star"></i>';
    }

    for (var i = 0 ; i < 5 - voto ;  i++ ) {
        stelleTot += '<i class="far fa-star"></i>';
    }
    return stelleTot;
}
