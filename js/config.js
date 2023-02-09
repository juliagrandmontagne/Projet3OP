
let lati = 45.75;
let long= 4.85;
let zoom= 13;
//reservation
let detelreservation = document.getElementById("annuler");
//canvas
let canvas = document.getElementById("signature");
let ctx = canvas.getContext("2d");
let canvasEffacer = document.getElementById('supprimer');
let canvasValider = document.getElementById('valider');
let canvasAnnuler = document.getElementById('annuler');
let sendformulaire = document.getElementById("envoyer");
//map
let prenom =document.getElementById("user_first-name").value;
let nom =document.getElementById("user_name").value;
let mymap= L.map('contenant', {scrollWheelZoom: false}).setView([ lati, long], zoom);
//appel ajax
   function ajax(url, callback) 
   {
    let requete = new XMLHttpRequest()
     requete.open("GET", url)
      requete.addEventListener("load", function() {
          if (requete.status >= 200 && requete.status < 400) 
          {
              // Appelle la fonction callback en lui passant la rÃŠponse de la requÃĒte
            callback(requete.responseText)
          } 
          else 
        {
        console.error(requete.status + " " + requete.statusText + " " + url)
        }
      })
      requete.addEventListener("error", function() {
          console.error("Erreur rÃŠseau avec l'URL " + url)
      })
     requete.send(null)
    }

let url = 'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=897bcd17da518129e7dff1f8559e15ee78182862';