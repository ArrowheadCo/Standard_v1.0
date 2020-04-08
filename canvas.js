/**
	Arrowhead Co. - canvas.js

	>>> Sets 2d context of canvas. 
	>>> Resizes it when necessary.
**/

	/*GLOBALS*/

//Canvas, context, dimensions
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),

	width,
	height;
	
	/*CANVAS*/

//Resizes canvas when needed
function resize(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	width = canvas.width;
	height = canvas.height;
};
resize();

//Fonts
function fontDefine(){
	let fontString = "";

	for(let i = 0; i < arguments.length; i++){
		let font = 	   arguments[i].split(" ");

		for(let j = 0; j < font.length; j++){
			fontString += font[j];

			if(j !== font.length - 1){
				fontString += "+";
			}
		}

		if(i !== arguments.length - 1){
			fontString += "|";
		}
	}

	let fonts = document.getElementById("fonts");

	if(fonts){
		fonts.parentNode.removeChild(fonts);
	} else {
		let link = document.createElement("link");

		link.id =   "fonts";
		link.rel =  "stylesheet";			
		link.type = "text/css";
		link.href = "https://fonts.googleapis.com/css?family=" + 
			fontString;

		document.getElementsByTagName("head")[0]
				.appendChild(link);
	}
}

	/*BINDINGS*/

//In case window resizes
window.onresize = resize();