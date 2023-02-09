let containerslide = document.querySelectorAll(".elements");
let images =  document.querySelectorAll(".element");
class Slider {
  constructor(containerslide, images) {
      // création des propriété d'instance 
      this.containerslide = containerslide;
      this.images = images;
      this.liveSlide = null;
      this.clics = null
      this.timeSlider = null
      this.prevBouton = document.querySelector("#chevron_gauche"); // Bouton prev.
      this.nextBouton = document.querySelector("#chevron_droit"); // Bouton next.
      this.playBouton = document.querySelector("#play"); // Bouton play.
      this.stopBouton = document.querySelector("#pause"); // Bouton stop.
      this.initialisationslider();
      this.lanceslide = setInterval(this.slideNext.bind(this), this.timeSlider)
      this.stopBouton.addEventListener('click', this.pauseslider.bind(this));
      this.playBouton.addEventListener('click', this.playSlider.bind(this));
      this.nextBouton.addEventListener('click', this.pauseSlideNext.bind(this));
      this.prevBouton.addEventListener('click', this.pauseSlidePrev.bind(this));
      //gestion de l'evenement des touches des claviers.
     window.addEventListener('keydown', this.eventKeyboard.bind(this));
  }
  // Initialisation
  initialisationslider() {
      this.reset();
      this.image0();
      this.liveSlide = 0;
      this.clics = 0;
      this.timeSlider = 5000;
  }
  // Fonction qui réinitialise toutes les slides.
  reset() {
      for (let i = 0; i < this.images.length; i++) // Initialisation, condition, étape (i est la variable ou le compteur de la boucle).
      {
          this.images[i].style.display = "none"; // Je fais disparaitre chaques slides.
      }
  }
  // fonction qui initialise image
  image0() {
      this.playBouton.style.display = "none";
      this.images[0].style.display = "flex";
  };
  //fonctionnement qui va relancer le slider.
  playSlider() {
      // Je relance le slider avec 5 sec d'interval entre les slides.
      this.lanceslide = setInterval(this.slideNext.bind(this), this.timeSlider);
      this.playBouton.style.display = "none";
      this.stopBouton.style.display = "block";
  }
  // méthode qui va passer a la slide suivante
  slideNext() {
      this.reset();
      if (this.liveSlide === this.images.length - 1) {
          this.liveSlide = 0;
      }
      else {
          this.liveSlide++
      }
      this.images[this.liveSlide].style.display = "flex";
  };
  // méthode qui va passer a la slide precedente
  slidePrev() {
      this.reset();
      if (this.liveSlide === 0) {
          this.liveSlide = this.images.length - 1;
      }
      else {
          this.liveSlide--;
      }
      this.images[this.liveSlide].style.display = "flex";
      console.log(this.slide);
  };
  // méthode pause slider avec clearinterval
 pauseslider() {
      clearInterval(this.lanceslide);
      this.playBouton.style.display = "block";
      this.stopBouton.style.display = "none";
  }
  // methode pour slide suivant et pause
  pauseSlideNext() {
      this.pauseslider();
      this.slideNext();
      this.clic = 1;
  }
  //methode pour slide precedent et pause
  pauseSlidePrev()
   {
      this.pauseslider();
      this.slidePrev();
      this.clic = 1;
  }
  
  eventKeyboard(event) {
    let c = event.code; // c correspond au numéro d'une touche du clavier.
    if (c === "ArrowLeft") // Flèche gauche du clavier.
    {
        this.pauseSlidePrev();
        this.clic = 1;
    }
   else if (c === "ArrowRight") // Flèche droite du clavier.
   {
        this.pauseSlideNext();
        this.clic = 1;
    }
   // touche du clavier 
    else if (c === "Space") {
        event.preventDefault();

        if (this.clic % 2 == 1) {
            this.playSlider();
            this.clic++
       }
        else {
            this.pauseslider();
            console.log(this.clic)
            this.clic++
        }
    }
    else { console.log("error") };
};
}
let Slideshower = new Slider(containerslide, images);