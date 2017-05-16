(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 480,
	height: 760,
	fps: 60,
	color: "#699CF9",
	opacity: 1.00,
	manifest: [
		{src:"images/clouds.png?1494974002627", id:"clouds"}
	]
};



lib.ssMetadata = [];


// symbols:



(lib.clouds = function() {
	this.initialize(img.clouds);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,235,100);


(lib.cloud = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.clouds();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,235,100);


// stage content:
(lib.backgroundcanvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;