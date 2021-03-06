//Create "constructor" to take in the ip and the port
var ip,port, httpURI;

//power off: ISC!1PWR00
//power on: ISC!1PWR01
//http://sdkdocs.roku.com/display/sdkdoc/External+Control+Guide

//TODO: Rewrire the http client to include checking for connection and have only 1 client instead of releasing it every time.

function Roku(ipAddress,port){
	this.ip = ipAddress;
	this.port = port;
	this.httpURI = "http://" + this.ip + ":" + this.port;
}


Roku.prototype.loadApplications = function(callback) {
	var url = this.httpURI + "/query/apps";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
			callback(this.responseText);
	    },
	    onerror: function(e) {
			Ti.API.info(e.error);
	    },
	    timeout:5000  /* in milliseconds */
	});
	xhr.open("GET", url);
	xhr.send();  // request is actually sent with this statement
};

Roku.prototype.selectApplication = function(id) {
	var url = this.httpURI + "/launch/" + id;
	var xhr = Ti.Network.createHTTPClient({
	    onerror: function(e) {
			Ti.API.info(e.error);
	    },
	    timeout:5000  /* in milliseconds */
	});
	xhr.open("POST", url);
	xhr.send();  // request is actually sent with this statement
};

Roku.prototype.keypress = function(press) {
	var url = this.httpURI + press;
	var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info();
        },
	    onerror: function(e) {
			Ti.API.info(e.error);
	    },
	    timeout:5000  /* in milliseconds */
	});
	xhr.open("POST", url);
	xhr.send();  // request is actually sent with this statement	
};

Roku.prototype.home = function() {
	this.keypress("/keypress/home");
};

Roku.prototype.rev = function() {
	this.keypress("/keypress/Rev");
};

Roku.prototype.fwd = function() {
	this.keypress("/keypress/Fwd");
};

Roku.prototype.play = function() {
	this.keypress("/keypress/Play");
};

Roku.prototype.select = function() {
	this.keypress("/keypress/Select");
};
 
Roku.prototype.back = function() {
	this.keypress("/keypress/Back");
};
 
Roku.prototype.instantReplay = function() {
	this.keypress("/keypress/InstantReplay");
};
 
Roku.prototype.info = function() {
	this.keypress("/keypress/Info");
};
 
Roku.prototype.backspace = function() {
	this.keypress("/keypress/Backspace");
};
 
Roku.prototype.search = function() {
	this.keypress("/keypress/Search");
};
 
Roku.prototype.enter = function() {
	this.keypress("/keypress/Enter");
};

Roku.prototype.up = function() {
	this.keypress("/keypress/Up");
};

Roku.prototype.down = function() {
	this.keypress("/keypress/Down");
};

Roku.prototype.left = function() {
	this.keypress("/keypress/Left");
};

Roku.prototype.right = function() {
	this.keypress("/keypress/Right");
};

//Loop through and pass what is needed into the roku device character by character
Roku.prototype.sendText = function(text) {	
	for (var i = 0, len = text.length; i < len; i++) {
	  this.keypress("/keypress/Lit_" + Ti.Network.encodeURIComponent(text[i]));
	}	
};







module.exports = Roku;