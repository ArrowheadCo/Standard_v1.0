/**
	Arrowhead Co. - input.js

	>>> Implementation of user input.
	>>> Mouse and key responses and bindings.
**/

	/*GLOBALS*/

var keys = {};

var mouse = {
	x : 0,
	y : 0,

	dx : 0,
	dy : 0,

	pressed :   false,
	released :  false,
	isPressed : false,

	reset : function(){
		this.dx = 0;
		this.dy = 0;

		this.pressed =  false;
		this.released = false;
	}
};

var pointerLock = 
    document.body.requestPointerLock ||
    document.body.mozRequestPointerLock;

var exitPointerLock = 
    document.body.exitPointerLock ||
    document.body.mozExitPointerLock;

	/*UTILITY FUNCTIONS*/

//For Mouse
function isLocked(){
    if(document.pointerLockElement !== null){
        document.addEventListener("mousemove", mouseMove);
    } else {
        document.removeEventListener("mousemove", mouseMove);
    }
};

function mouseMove(input){
	mouse.dx = input.movementX;
	mouse.dy = input.movementY;
};

function mousePress(input){
	mouse.pressed =   true;
	mouse.isPressed = true;

	if(input.button == 0){
		mouse.button = "left";
	} else {
		mouse.button = "right";
	}
};

function mouseRelease(input){
	mouse.released =  true;
	mouse.isPressed = false;
	mouse.button =    undefined;
};

//For Keys
function keyPress(input){
	let key = input.code;

	if(key.includes("Key")){
		key = key.slice(3);
	}
	if(key.includes("Arrow")){
		key = key.slice(5);
	}

	keys[key.toUpperCase()] = true;
};

function keyRelease(input){
	let key = input.code;

	if(key.includes("Key")){
		key = key.slice(3);
	}
	if(key.includes("Arrow")){
		key = key.slice(5);
	}

	keys[key.toUpperCase()] = false;
};

	/*BINDINGS*/

document.addEventListener("mousedown", mousePress);
document.addEventListener("mouseup", mouseRelease);

document.getElementById("canvas").onclick = pointerLock;
document.addEventListener("pointerlockchange", isLocked);
document.addEventListener("mozpointerlockchange", isLocked);

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);