//affiche carte

class carte
{  
  constructor ()
	{  
  this.prenom=prenom;
  this.nom=nom;
  this.mymap=mymap;
  //this.valider=valider;
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.mymap); 
  this.url = url;
  this.getdata();
  //envoyer
  this.sendformulaire = sendformulaire;
  this.sendformulaire.addEventListener("click", this.storage.bind(this));
  
 
  }
 getdata() 
    {
      ajax(this.url,(reponse)=>
      {
        let markers = L.markerClusterGroup();
        let data = JSON.parse(reponse);
        for (let i = 0; i < data.length; i++) 
        {
          let station = data[i];
          let position = station.position;
          let latitude = position.lat;
          let longitude = position.lng;
          let marker = L.marker([latitude, longitude]);
          markers.addLayer(marker);//ajoute les marker aux groupe
          this.mymap.addLayer(markers);

        marker.addEventListener("click", () => 
        {
          document.getElementById("nom-station").innerHTML = station.name; 
          document.getElementById("statut-de-station").innerHTML = station.status;
          document.getElementById("nombre-place").innerHTML = station.available_bike_stands;
          document.getElementById("adresse-station").innerHTML = station.address;
          document.getElementById("nombre-velo").innerHTML = station.available_bikes;
          document.getElementById("choix").style.display= "none";
          document.getElementById("deuxsieme").style.display= "block";
          document.getElementById("info").style.display= "flex";
          //savedata
          sessionStorage.setItem('station.name',station.name);
          sessionStorage.setItem('station.address',station.address);  
          sessionStorage.setItem('leprenom', this.prenom);
          sessionStorage.setItem('nom',this.nom);
        
        })          
        }
      })
    }
    storage()
    {
          this.prenom = document.getElementById("user_first-name").value;
          this.nom = document.getElementById("user_name").value;
            localStorage.setItem('leprenom', this.prenom);
            localStorage.setItem('nom', this.nom);         
            document.getElementById("bloc-signature").style.display= "block";
    }
 
}
//initialisation permanante
 let intital= new carte();
 
 