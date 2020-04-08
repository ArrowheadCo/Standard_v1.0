/**
	Arrowhead Co. - graphics.js

	>>> Custom shorthand functions.
	>>> A graphics library for the 2d rendering context.
**/

	/*CONSTRUCTORS*/

var color = function(r, g, b, a){
	let info = [];

	if(!g && g !== 0){
		info = [r, r, r, 255];
	} else {
		if(!b && b !== 0){
			info = [r, r, r, g];
		} else {
			if(!a && a !== 0){
				info = [r, g, b, 255];
			} else {
				info = [r, g, b, a];
			}
		}
	}

	return info;
};

	/*COLOR MODIFYING FUNCTIONS*/

function red(Color){
	return Color[0];
};

function green(Color){
	return Color[1];
};

function blue(Color){
	return Color[2];
};

function alpha(Color){
	return Color[3];
};

function gray(Color){
	let grayVal = 0;

	for(let i = 0; i < 3; i++){
		grayVal += Color[i];
	}

	grayVal /= 3;

	return color(grayVal, Color[3]);
}

function lerp(color1, color2, amount){
	let lerped = [];

	lerped[0] = red(color1) *   (1 - amount) + 
				red(color2) *   (amount);
	lerped[1] = green(color1) * (1 - amount) + 
				green(color2) * amount;
	lerped[2] = blue(color1) *  (1 - amount) + 
				blue(color2) *  amount;
	lerped[3] = alpha(color1) * (1 - amount) + 
				alpha(color2) * amount;

	return lerped;
};

function dim(Color, amount){
	return lerp(Color, 
		   color(0, 
		   alpha(Color)), amount);
};

function lit(Color, amount){
	return lerp(Color, 
		   color(255, 
		   alpha(Color)), amount);
};

	/*COLOR DRAWING FUNCTIONS*/

//Sets canvas fillStyle
function fill(r, g, b, a){
	if(!g && g !== 0){
		if(typeof r === "number"){
			ctx.fillStyle = 
				"rgb(" + 
				r + "," + 
				r + "," + 
				r + ")";
		} else {
			ctx.fillStyle = 
				"rgba(" + 
				r[0] + "," + 
				r[1] + "," + 
				r[2] + "," + 
				r[3] / 255 + ")";
		}
	} else {
		if(!b && b !== 0){
			g /= 255;

			ctx.fillStyle = 
				"rgba(" + 
				r + "," + 
				r + "," + 
				r + "," + 
				g + ")";
		} else {
			if(!a && a !== 0){
				ctx.fillStyle = 
					"rgb(" + 
					r + "," + 
					g + "," + 
					b + ")";
			} else {
				a /= 255;

				ctx.fillStyle = 
					"rgba(" + 
					r + "," + 
					g + "," + 
					b + "," + 
					a + ")";
			}
		}
	}
};

function noFill(){
	fill(0, 0);
};

function background(r, g, b, a){
	if(typeof r === "number"){
		fill(r, g, b, a);
	} else {
		fill(r);
	}
	ctx.fillRect(-1, -1,
		width + 2, height + 2);
}

//Sets canvas strokeStyle
function stroke(r, g, b, a){
	if(!g && g !== 0){
		if(typeof r === "number"){
			ctx.strokeStyle = 
				"rgb(" + 
				r + "," + 
				r + "," + 
				r + ")";
		} else {
			ctx.strokeStyle = 
				"rgba(" + 
				r[0] + "," + 
				r[1] + "," + 
				r[2] + "," +
				r[3] / 255 + ")";
		}
	} else {
		if(!b && b !== 0){
			g /= 255;

			ctx.strokeStyle = 
				"rgba(" + 
				r + "," + 
				r + "," + 
				r + "," + 
				g + ")";
		} else {
			if(!a && a !== 0){
				ctx.strokeStyle = 
					"rgb(" + 
					r + "," + 
					g + "," + 
					b + ")";
			} else {
				a /= 255;

				ctx.strokeStyle = 
					"rgba(" + 
					r + "," + 
					g + "," + 
					b + "," + 
					a + ")";
			}
		}
	}
};

function noStroke(){
	stroke(0, 0);
};

function weight(n){
	ctx.lineWidth = n;
};

	/*SHAPE FUNCTIONS*/

//Ellipse
function ellipse(x, y, w, h){
	ctx.beginPath();
	ctx.ellipse(x, y, w / 2, h / 2,
		0, 0, Math.PI * 2);

	ctx.fill();
	ctx.stroke();
};

//Rectangle
function rect(x, y, w, h){
	ctx.beginPath();
	ctx.moveTo(x,     y);
	ctx.lineTo(x + w, y);
	ctx.lineTo(x + w, y + h);
	ctx.lineTo(x,     y + h);
	ctx.lineTo(x,     y);

	ctx.fill();
	ctx.stroke();
};

//General polygon function
function poly(){
	let points = [];

	if(typeof arguments[0] === "number"){
		points = arguments;
	} else {
		points = arguments[0];
	}

	let pointCount = points.length;

	ctx.beginPath();
	ctx.moveTo(
		points[pointCount - 2],
		points[pointCount - 1]);
	for(let i = 0; i < pointCount; i += 2){
		ctx.lineTo(
			points[i],
			points[i + 1]);
	}

	ctx.fill();
	ctx.stroke();
};

	/*TEXT FUNCTIONS*/

function font(font, size){
	if(!size){
		size = 20;
	}

	ctx.font = size + "px " + font;
};

function align(x, y){
	switch(x){
		case "LEFT":
			ctx.textAlign = "start";
		break;
		case "CENTER":
			ctx.textAlign = "center";
		break;
		case "RIGHT":
			ctx.textAlign = "end";
		break;
		default:
			ctx.textAlign = "start";
		break;
	}

	switch(y){
		case "TOP":
			ctx.textBaseline = "top";
		break;
		case "CENTER":
			ctx.textBaseline = "middle";
		break;
		case "BOTTOM":
			ctx.textBaseline = "bottom";
		break;
		default:
			ctx.textBaseline = "alphabetic";
		break;
	}	
};

function text(text, x, y, borderWeight){
	ctx.fillText(text, x, y);

	if(borderWeight){
		let prevWeight = ctx.lineWidth;

		ctx.lineWidth = borderWeight;
		ctx.strokeText(text, x, y);
		ctx.lineWidth = prevWeight;
	}
};

	/*GLOBALS*/

var BLACK = color(0),
	WHITE = color(255),

	RED =   color(255, 0, 0),
	GREEN = color(0, 255, 0),
	BLUE =  color(0, 0, 255);