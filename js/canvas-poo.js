
class canvaspoo {
    constructor () {
        // definition des propriété de la classe
        this.canvasEffacer = canvasEffacer;
        this.canvasValider = canvasValider;
        this.canvasAnnuler = canvasAnnuler;
        this.canvas = canvas;
        this.ctx = ctx;
        // propriété pour garder la trace des positions mouse et toucher
        this.touchX, 
        this.touchY;
        this.mouseX;
        this.mouseY;
        // booleen
        this.mouseDown;

        // evenement de la souris et du pad
        this.canvas.addEventListener('touchstart', this.canvasPremiereTouche.bind(this), false);
        this.canvas.addEventListener('touchmove', this.canvasMouvementTouche.bind(this), false);
        this.canvas.addEventListener('mousedown', this.canvasPremierMouse.bind(this), false);
        this.canvas.addEventListener('mousemove', this.canvasMouvementMouse.bind(this), false);
        this.canvas.addEventListener('mouseup', this.canvasMouseStop.bind(this), false);

        this.canvasEffacer.addEventListener('click',this.effacerCanvas.bind(this))
        this.init();

    }

    // initialisation des boutons du canvas annuler présent
	init() {
		this.canvasEffacer.style.opacity = "0";
		this.canvasValider.style.opacity = "0";
		this.canvasAnnuler.style.opacity = "1";
	}
    
    // fonction effacer du canvas
    effacerCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //fonction qui dessine le point a la fois pour mouse et touch
    Tracer(x,y) {  
        this.ctx.lineWidth = 5 * 2;
        this.ctx.lineTo(x,y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(x,y,5,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(x,y)

        // apparition des boutons effacer ou reserver
        this.canvasEffacer.style.opacity = "1";
        this.canvasValider.style.opacity = "1";
    }


/////////////////////////// Evenement Pad ///////////////////////////////

    // fonction du premier desssin avec touch
    canvasPremiereTouche() {
       this.PositionToucher();
       this.Tracer(this.touchX,this.touchY,);
        console.log("premierTouche")
       event.preventDefault();
}
    // 
    canvasMouvementTouche(e) { 
       // Appel des positions de la touche a chaque fois que le touch est effectué
       this.PositionToucher(e);
        //  Lors d’un touchmove, contrairement à un mousemove, nous n’avons pas besoin de vérifier si le touch est activé, 
        //  car il y aura toujours un contact avec l’écran par définition.
       this.Tracer(this.touchX,this.touchY,12); 
       // eviter l'action prédifini par un scroll lors du touché.
       event.preventDefault();
   }

    // Position par rapport à notre div cible. On va les ajuster en utilisant "target.offsetLeft" et
    // "target.offsetTop" pour obtenir les valeurs correctes par rapport à la partie supérieure gauche de la toile.
    PositionToucher(e) {
       if (!e)
           var e = event;

       if (e.touches) {
           if (e.touches.length == 1) { // un seul doigt doit etre pris en compte
                e.preventDefault();
                for(let i=0; i<e.touches.length; i++) {
                    var touch = e.touches[i]; // on prend les infos du doigt.
                    this.touchX=touch.pageX - touch.target.offsetLeft;
                    this.touchY=touch.pageY - touch.target.offsetTop;
                }
           }
       }
   }

    //////////////////////Evenement Souris //////////////////////


// Fonction qui garde une trace du bouton de la souris enfoncé dessinanaty un point à l’emplacement ciblé
    canvasPremierMouse() {
        this.mouseDown = true;
        this.Tracer(this.mouseX,this.mouseY,);
}

// fonction gardons trace de la position lorsque la souris est relaché
    canvasMouseStop() {
        this.mouseDown = false ;
}

// Fonction permettant de reprendre le dessin a la position laissée
    canvasMouvementMouse(e) { 
    // avec event car mouvement de la souris
        this.positionMouse(e);

        // lorsque clic de souris préssé
        if (this.mouseDown) {
        this.Tracer(this.mouseX,this.mouseY);
    }
}

// fonction pour le positionnement de la souris
    positionMouse(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        }
        else if (e.layerX) {
            this.mouseX = e.layerX;
            this.mouseY = e.layerY;
        }
    }
}
let mekeitwork= new canvaspoo();