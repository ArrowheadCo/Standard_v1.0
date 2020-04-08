/**
	Arrowhead Co. - time.js

	>>> Helps determine the current fps.
	>>> Also standardizes time.
	>>> Helps simulations / games run in uniform time.
**/

	/*GLOBALS*/

var TIME = {
	start :   (new Date()).getTime(),
	current : (new Date()).getTime(),
	latent :  (new Date()).getTime(),

	old : (new Date()).getTime(),
	new : (new Date()).getTime(),

	dt :     0,
	fps :    0,
	FPS :    60,
	thresh : 1000 / 3,
};

	/*METHODS*/

TIME.update = function(){
	this.old = this.new;
	this.new = (new Date()).getTime();

	this.current = this.new;
	this.dt =  	   this.new - this.old;

	if(this.current - 
	   this.latent > this.thresh){
		this.latent = this.current;
		this.fps = ~~(1000 / this.dt);
	}

	this.dt *= this.FPS / 1000;
};

TIME.fpsCounter = function(color, back){
	let fpsCounter = document.getElementById("fps");

	if(fpsCounter){
		fpsCounter.innerHTML = "FPS : " + this.fps;
	} else {
		fpsCounter = document.createElement("div");
		fpsCounter.id = "fps";
		fpsCounter.style.color = color;

		if(back){
			fpsCounter.style.background = back;
		}

		document.getElementById("body").
				 appendChild(fpsCounter);
	}
};