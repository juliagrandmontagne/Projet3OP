let secondes= 1200;
let compteur= document.getElementById('decompte');
let votrereservation = document.getElementById("revelation");//champ non remplit resefvation
let noreservation = document.getElementById("noreservation");
let valider = document.getElementById("valider");
class essai
{
  constructor()
    {     
      this.valider=valider;
      this.annuler=annuler;
      this.concervationdutimer();
      this.restorename();
      this.noreservation= noreservation;
      this.noreservation.addEventListener("click", this.detel.bind(this));
      this.valider.addEventListener("click", this.stop.bind(this));
      this.annuler.addEventListener("click", this.suprimesa.bind(this));
      this.compteur= compteur;
      this.secondes= secondes;
   }
  concervationdutimer() //fonction a la relance qui regle la reservation
  {
    document.getElementById('decompte').innerHTML=sessionStorage.getItem('secondes');
    if(sessionStorage.getItem('secondes')==null )//pemet annuler les champ dereservation arriver fin de decompte
    {
      this.detel();//suprime info fin de reservation
      document.getElementById("contenant").style.display= "block";
    }
    else{
      //permet de relancer automatiquement le compteur
      document.getElementById("nomdestation").innerHTML=sessionStorage.getItem('station.name');
      document.getElementById("adressedestation").innerHTML=sessionStorage.getItem('station.address');
      document.getElementById("prenom-utilisateur").innerHTML=sessionStorage.getItem('leprenom');
      document.getElementById("nom-utilisateur").innerHTML=sessionStorage.getItem('nom');
      document.getElementById("contenant").style.display= "none";
      }
    if( sessionStorage.getItem('station.name')==null)//boucle de securité pour eviter le timer de relancer sans reservation
    {
      sessionStorage.removeItem('secondes') ;
      document.getElementById("parsdefaut").style.display= "grid";
      document.getElementById("tempsrestant").style.display= "none";
      document.getElementById("contenant").style.display= "block";
       }
      else//permet de relancer le compteur si une reservation en cours
      { 
        this.stop();  
      }
  }
  reservation()//restitue les donnes de lapi et enregistreen storage
  {
    document.getElementById("nomdestation").innerHTML=sessionStorage.getItem('station.name');
    document.getElementById("adressedestation").innerHTML=sessionStorage.getItem('station.address');
    document.getElementById("prenom-utilisateur").innerHTML=sessionStorage.getItem('leprenom');
    document.getElementById("nom-utilisateur").innerHTML=sessionStorage.getItem('nom');
    document.getElementById("tempsrestant").style.display= "grid";
    document.getElementById("parsdefaut").style.display= "none";
    document.getElementById("contenant").style.display= "block";
    document.getElementById("info").style.display= "none";
  };
  detel()//suprime tout et restitue point de depart
    {
      sessionStorage.clear();
      clearInterval(this.test);
      document.getElementById("info").style.display= "none";//paslu
      document.getElementById("tempsrestant").style.display= "none";//paslu
      document.getElementById("parsdefaut").style.display= "grid";
      document.getElementById("contenant").style.display= "block"; 
    }
    suprimesa()//permet de reset a annuler
    {
      sessionStorage.clear();
      document.getElementById("bloc-signature").style.display= "none";
      document.getElementById("info").style.display= "none";
    }
    restorename()
    {
      document.getElementById("user_first-name").value=localStorage.getItem('leprenom');
      document.getElementById("user_name").value=localStorage.getItem('nom');
    }
    methodetimer() 
  { 
    if (sessionStorage.getItem('secondes')==null )
    {
      this.secondes=secondes;
    }
    else
    {
      this.secondes=sessionStorage.getItem("secondes");
      document.getElementById("parsdefaut").style.display= "none";
      document.getElementById("tempsrestant").style.display= "grid";//element bloquant
      document.getElementById("nomdestation").innerHTML=sessionStorage.getItem('station.name');
      document.getElementById("adressedestation").innerHTML=sessionStorage.getItem('station.address');
      document.getElementById("prenom-utilisateur").innerHTML=sessionStorage.getItem('leprenom');
      document.getElementById("nom-utilisateur").innerHTML=sessionStorage.getItem('nom');
    }
    if ( this.secondes==0  )
    {
      clearInterval(this.stop())
      document.getElementById("parsdefaut").style.display= "grid";
      document.getElementById("info-reservation").style.display= "none";
      document.getElementById("noreservation").innerHTML= "réserver de nouveaux";
    }
    else
    {
      this.secondes--; 
      document.getElementById("contenant").style.display= "none";
      document.getElementById("info").style.display= "none";
    }
   let compteMn = parseInt(this.secondes/60);
   let compteSc = this.secondes % 60;
   this.compteur.innerHTML = compteMn + ":" + (compteSc < 10 ? "0" : "") + compteSc;
   sessionStorage.setItem("secondes", this.secondes);
  } 
  stop() 
      {
        this.test=setInterval(this.methodetimer.bind(this), 1000);
      }
};
let active= new essai();