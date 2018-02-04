var buttonStart = document.getElementById('button--start');
var imagePet = document.getElementById('image--pet');
var barHunger = document.getElementById('bar--hunger');
var barCare = document.getElementById('bar--care');
var barFun = document.getElementById('bar--fun');
var buttonFeed = document.getElementById('button--feed');
var buttonCare = document.getElementById('button--care');
var buttonPlay = document.getElementById('button--play');

var pet = {
  hunger: 0,
  thirst: 0,
  fun: 0,
  live: function() {
      this.care -= 0.1;
      this.hunger -= 0.2;
      this.fun -= 0.15;
      if(this.hunger < 0) {
        this.hunger = 0;
      }
      if(this.care < 0) {
        this.care = 0;
      }
      if(this.fun < 0) {
        this.fun = 0;
      }
  },
  face: function(){
    if(this.fun >= 80 && this.care >= 80 && this.hunger >= 80) {
      imagePet.src = "images/petHappy.png";
    } else if(this.fun <= 50 && this.fun >= 30 && this.care <= 50 && this.care >= 30 && this.hunger <= 50 && this.hunger >= 30 || this.fun <= 50 && this.fun >= 30 && this.care <= 50 && this.care >= 30 && this.hunger >= 50  || this.fun <= 50 && this.fun >= 30 && this.hunger <= 50 && this.hunger >= 30 && this.care >= 50 || this.hunger <= 50 && this.hunger >= 30 && this.care <= 50 && this.care >= 30 && this.fun >= 50) {
      imagePet.src = "images/petSad.png";
    } else if(this.fun < 30 && this.hunger < 30 && this.care < 30 || this.fun < 30 && this.hunger < 30 && this.care > 30 || this.fun < 30 && this.hunger > 30 && this.care < 30 || this.fun > 30 && this.hunger < 30 && this.care < 30) {
      imagePet.src = "images/petCry.png";
    } else if(this.care < 30 && this.fun > 30 || this.care < 30 && this.hunger > 30) {
      imagePet.src = "images/petSick.png";
    } else if(this.hunger < 30 && this.fun > 30 || this.hunger < 30 && this.care > 30) {
      imagePet.src = "images/petHungry.png";
    } else if(this.fun < 30 && this.hunger > 30 || this.fun < 30 && this.care > 30) {
      imagePet.src = "images/petSleep.png";
    } else {
      imagePet.src = "images/petHello.png";
    }
  }
};

function state() {
  return 50 + Math.floor((Math.random() * 50) + 1);
}

function updateBars() {
  barHunger.style.width = pet.hunger.toString() + "%";
  barCare.style.width = pet.care.toString() + "%";
  barFun.style.width = pet.fun.toString() + "%";
}

buttonFeed.addEventListener('click', function() {
    pet.hunger += 10;
    if(pet.hunger > 100) {
     	pet.hunger = 100;
    }

    var setFeed = setInterval(function() {
    	imagePet.src = "images/petFeed.png";
    });

    setTimeout(function() { 
    	clearInterval(setFeed);
    }, 500);

});

buttonCare.addEventListener('click', function() {
    pet.care += 10;
    if(pet.care > 100) {
      	pet.care = 100;
    }

    var setShower = setInterval(function() {
    	imagePet.src = "images/petShower.png";
    });

    setTimeout(function() {
    	clearInterval(setShower);
    }, 500);

});

buttonPlay.addEventListener('click', function() {
    pet.fun += 10;
    if(pet.fun > 100) {
      	pet.fun = 100;
    }

   	var setPlay = setInterval(function() {
    	imagePet.src = "images/petPlay.png";
    });

    setTimeout(function() {
    	clearInterval(setPlay);
    }, 500);

});

buttonFeed.disabled = true;
buttonCare.disabled = true;
buttonPlay.disabled = true;

buttonStart.addEventListener('click', function(event) {
	
	this.style.visibility = "hidden";
	this.innerHTML = "Restart game";

	buttonFeed.disabled = false;
	buttonCare.disabled = false;
	buttonPlay.disabled = false;


	pet.hunger = state();
  pet.care = state();
  pet.fun = state();
	
	var intervalTime = setInterval(function() {
	
		pet.live();
	 	pet.face();
	  updateBars();

		if(pet.hunger == 0 && pet.care == 0 && pet.fun == 0) {
	    	console.log("umarł");
	      clearInterval(intervalTime);
	      imagePet.src = "images/petDead.png";
	    	buttonStart.style.visibility = "visible";

	      buttonFeed.disabled = true;
			  buttonCare.disabled = true;
			  buttonPlay.disabled = true;
	    }

	}, 100);

});