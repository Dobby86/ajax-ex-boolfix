// console.log("ciao");
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
// $(document).ready(function(){
//
//   var casa=$("#scrivi").val();
//
//
//   $.ajax({
//               url: "https://api.themoviedb.org/3/search/movie?",
//               method: "GET",
//               dataType: "json",
//               data: {
//                   api_key: "aecc5cd7bf4a2c1736a6c6b92e0a3b8b",
//                   language: "it-IT",
//                   query: "casa",
//               },
//               success: function (data) {
//                 console.log(data)
//
//
//
//
//
//               },
//               error: function(richiesta, stato, errori){
//               }
//           });
//
//

$(document).ready(function() {

var variabileRicerca = $("#scrivi").val();

$.ajax({
    url: "https://api.themoviedb.org/3/movie/550?",
    method: "GET",
    dataType: "json",
    data: {
        api_key: "76dafb6359bcac21006df98494394fce",
        language: "it-IT",
        query: "variabileRicerca",
    },
    success : function(data) {
        var prova = data.response;
            console.log();
    },
    error: function(richiesta, stato, errori){
    }

});














});
