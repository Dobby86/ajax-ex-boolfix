// console.log("ciao");
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
$(document).ready(function() {
//mouse enter
$(document).on('mouseenter', '.film', function() {

                    // console.log('sono entrato in un film!');
                    var elementoSelezionato = $(this);
                    var img = elementoSelezionato.find('.copertina');

                    // console.log(img.attr('src'));

                    $(this).find(".overlay").show();
                    $(this).find(".backimg").show();
                    $(this).find("h5").show();
                    $(this).find(".titolo").show();

});
//mouse leave
$(document).on('mouseleave', '.film', function() {

                    // console.log('sono entrato in un film!');
                    var elementoSelezionato = $(this);
                    var img = elementoSelezionato.find('.copertina');
                    // console.log(img.attr('src'));

    $(this).find(".overlay").hide();


});

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

                        var listaCorrente = listaFilm [i];

                        //parte simile
                        var originalLan = listaCorrente.original_language;

                        var valoreProprietàLinguaggio = "";

                        console.log(originalLan);

            // come lo valorizzo?
            if (originalLan == "en") {
                        valoreProprietàLinguaggio = '<img class="flag" src = "img/gb.png" >';

            }else if (originalLan == "it"){
                                    valoreProprietàLinguaggio = '<img class="flag" src = "img/it.png" >';

            }else if (originalLan == "es"){
                        valoreProprietàLinguaggio = '<img class="flag" src = "img/es.png" >';

            }else if (originalLan == "de"){
                        valoreProprietàLinguaggio = '<img class="flag" src = "img/de.png" >';
            }else if (originalLan == "fr"){
                        valoreProprietàLinguaggio = '<img class="flag" src = "img/fr.png" >';
            }else if (originalLan == "ja"){
                        valoreProprietàLinguaggio = '<img class="flag" src = "img/jp.png" >';
            }else if (originalLan == "sv"){
                        valoreProprietàLinguaggio = '<img class="flag"  src = "img/se.png" >';
            }
             else {
                        valoreProprietàLinguaggio = originalLan;
            }
            // partefilm
                                var voto = listaCorrente.vote_average;
                                var votoCorretto = Math.ceil(voto / 2);
                                // copertine
                                var sito = "https://image.tmdb.org/t/p/";
                                var size = "w200";
                                var coverFilm = sito + size + listaCorrente.poster_path ;
                                var diDietro = sito + size + listaCorrente.backdrop_path;


                                // parte copertine
                                var imgRotta = "https://lh3.googleusercontent.com/proxy/zDQaGTu0edCNxXuCnASMhw8GxMsy_7ic-CJU16sTsYdPhz2UzJzVRkluZphOaZTM0GNve1nLc8mGBHnai7cjNxCDQ-CLWjhsRlTRxcJ1DRwjO5u8RzDl";


            var verificare = listaCorrente.poster_path;

                        if (verificare == null) {
                     generator = imgRotta ;
                        } else {
                     generator = coverFilm;
                 }
                 // cambio copertina......................................................................

                             var cambioLato = listaCorrente.backdrop_path;

                                         if (cambioLato == null) {
                                      generatorDietro = imgRotta ;
                                         } else {
                                      generatorDietro = diDietro;
                                  }

            var context = {

                        back: generatorDietro,

                        title : listaCorrente.title,
                        subtitle : listaCorrente.original_title,
                        date : listaCorrente.release_date,
                        language :valoreProprietàLinguaggio,
                        cover : generator,
                        overview : listaCorrente.overview,
                        stelline : generaStelle(votoCorretto),
                        tipoRichiesta : "Film"

                    };
                        var risultatoDaAggiungere = template(context);
                        $(".film-container").append(risultatoDaAggiungere);
                        // console.log(risultatoDaAggiungere);
        }

    },

      error: function(richiesta, stato, errori){
          alert("errore");
    },

});

// serie tv........................................................................................................
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

        for (var i = 0 ;  i < listaSerie.length; i++) {

                    var listaCorrenteSerie = listaSerie [i];

                    var originalLan = listaCorrenteSerie.original_language;

 // listaCorrenteSerie.original_language;

            var valoreProprietàLinguaggio = "";

            console.log(originalLan);

            // come lo valorizzo?
                            if (originalLan == "en") {
                                valoreProprietàLinguaggio = '<img class="flag" src = "img/gb.png">';
                            }else if (originalLan == "it"){
                                valoreProprietàLinguaggio = '<img class="flag" src = "img/it.png" >';
                            }else if (originalLan == "es"){
                                valoreProprietàLinguaggio = '<img class="flag" src = "img/es.png" >';
                            }else if (originalLan == "de"){
                                valoreProprietàLinguaggio = '<img class="flag" src = "img/de.png" >';
                            }else if (originalLan == "fr"){
                                valoreProprietàLinguaggio = '<img class="flag" src = "img/fr.png" >';
                            }else if (originalLan == "ja"){
                                valoreProprietàLinguaggio = '<img class="flag" src = "img/jp.png" >';
                            }else if (originalLan == "sv"){
                                valoreProprietàLinguaggio = '<img class="flag" src = "img/se.png" >';
                            }
                             else {
                                valoreProprietàLinguaggio = originalLan;
                            }

                            var voto = listaCorrenteSerie.vote_average;
                            var votoCorretto = Math.ceil(voto / 2);
                            // copertine serie
                            var sito = "https://image.tmdb.org/t/p/";
                            var size = "w200";
                            var coverSerie = sito + size + listaCorrenteSerie.poster_path ;
                            var serieDietro = sito + size + listaCorrenteSerie.backdrop_path;

            // test

                            // parte immagini
                            var imgRotta = "https://lh3.googleusercontent.com/proxy/zDQaGTu0edCNxXuCnASMhw8GxMsy_7ic-CJU16sTsYdPhz2UzJzVRkluZphOaZTM0GNve1nLc8mGBHnai7cjNxCDQ-CLWjhsRlTRxcJ1DRwjO5u8RzDl";

            var verificare = listaCorrenteSerie.poster_path;

                             if (verificare == null) {
                                 generator = imgRotta ;
                             } else {
                                 generator = coverSerie;
                             }
                             // pellicola Dietro
                             var cambioLato = listaCorrenteSerie.backdrop_path;

                                         if (cambioLato == null) {
                                      generatorDietro = imgRotta ;
                                         } else {
                                      generatorDietro = serieDietro;
                                  }


            var context = {

                        title : listaCorrenteSerie.name,
                        back : generatorDietro,

                        subtitle : listaCorrenteSerie.original_name,
                        date : listaCorrenteSerie.first_air_date,
                        language : valoreProprietàLinguaggio,
                        stelline : generaStelle(votoCorretto),
                        cover : generator,
                        overview : listaCorrenteSerie.overview,

                        tipoRichiesta : "Tv Series"

                    };

            var risultatoDaAggiungere = template(context);

            $(".serie-container").append(risultatoDaAggiungere);
            // console.log(risultatoDaAggiungere);
        }

// fine faseprima
    },


      error : function(richiesta, stato, errori){
           alert("errore");
    },

});


});
// fine ready
});
// funzione per le stelline
function generaStelle (voto){

    var stelleTot = " ";

                for (var i = 0; i < voto; i++){

                    stelleTot += '<i id="gold" class="fas fa-star"></i>';
                }
                for (var i = 0 ; i < 5 - voto ;  i++ ) {
                    stelleTot += '<i id="yellow" class="far fa-star"></i>';
                }
                return stelleTot;
}
