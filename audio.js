/**
	Arrowhead Co. - audio.ja

	>>> Supports audio.
	>>> Fetches audio from github.
**/

	/*CONSTRUCTORS*/

var Sound = function(author, repo, file, loop){
	let src = "https://cdn.jsdelivr.net/gh/";

	src += author + "/";
	src += repo   + "/";
	src += file;

	this.audio     =  document.createElement("audio");
	this.audio.src =  src;
	this.audio.loop = loop;

	this.audio.setAttribute("preload",  "auto");
	this.audio.setAttribute("controls", "none");
	this.audio.style.display = "none";

	document.getElementById("body").
			 appendChild(this.audio);
};

	/*METHODS*/

Sound.prototype.play = function(){
	this.audio.play();
}

Sound.prototype.stop = function(){
	this.audio.pause();
}