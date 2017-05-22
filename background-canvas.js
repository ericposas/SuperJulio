(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 480,
	height: 760,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_4584.png?1495310499834", id:"_4584"},
		{src:"images/brick_200x200.jpg?1495310499834", id:"brick_200x200"},
		{src:"images/clouds.png?1495310499834", id:"clouds"}
	]
};



lib.ssMetadata = [];


// symbols:



(lib._4584 = function() {
	this.initialize(img._4584);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1032,2174);


(lib.brick_200x200 = function() {
	this.initialize(img.brick_200x200);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


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


(lib.brick_floor = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// brick bottom
	this.instance = new lib.brick_200x200();
	this.instance.parent = this;
	this.instance.setTransform(-41.7,694.6,0.2,0.2);

	this.instance_1 = new lib.brick_200x200();
	this.instance_1.parent = this;
	this.instance_1.setTransform(478.2,694.6,0.2,0.2);

	this.instance_2 = new lib.brick_200x200();
	this.instance_2.parent = this;
	this.instance_2.setTransform(438.3,694.6,0.2,0.2);

	this.instance_3 = new lib.brick_200x200();
	this.instance_3.parent = this;
	this.instance_3.setTransform(398.3,694.6,0.2,0.2);

	this.instance_4 = new lib.brick_200x200();
	this.instance_4.parent = this;
	this.instance_4.setTransform(358.3,694.6,0.2,0.2);

	this.instance_5 = new lib.brick_200x200();
	this.instance_5.parent = this;
	this.instance_5.setTransform(318.3,694.6,0.2,0.2);

	this.instance_6 = new lib.brick_200x200();
	this.instance_6.parent = this;
	this.instance_6.setTransform(278.3,694.6,0.2,0.2);

	this.instance_7 = new lib.brick_200x200();
	this.instance_7.parent = this;
	this.instance_7.setTransform(238.3,694.6,0.2,0.2);

	this.instance_8 = new lib.brick_200x200();
	this.instance_8.parent = this;
	this.instance_8.setTransform(198.3,694.6,0.2,0.2);

	this.instance_9 = new lib.brick_200x200();
	this.instance_9.parent = this;
	this.instance_9.setTransform(158.3,694.6,0.2,0.2);

	this.instance_10 = new lib.brick_200x200();
	this.instance_10.parent = this;
	this.instance_10.setTransform(118.3,694.6,0.2,0.2);

	this.instance_11 = new lib.brick_200x200();
	this.instance_11.parent = this;
	this.instance_11.setTransform(78.3,694.6,0.2,0.2);

	this.instance_12 = new lib.brick_200x200();
	this.instance_12.parent = this;
	this.instance_12.setTransform(38.3,694.6,0.2,0.2);

	this.instance_13 = new lib.brick_200x200();
	this.instance_13.parent = this;
	this.instance_13.setTransform(-1.7,694.6,0.2,0.2);

	this.instance_14 = new lib.brick_200x200();
	this.instance_14.parent = this;
	this.instance_14.setTransform(-41.7,734.6,0.2,0.2);

	this.instance_15 = new lib.brick_200x200();
	this.instance_15.parent = this;
	this.instance_15.setTransform(478.2,734.6,0.2,0.2);

	this.instance_16 = new lib.brick_200x200();
	this.instance_16.parent = this;
	this.instance_16.setTransform(438.3,734.6,0.2,0.2);

	this.instance_17 = new lib.brick_200x200();
	this.instance_17.parent = this;
	this.instance_17.setTransform(398.3,734.6,0.2,0.2);

	this.instance_18 = new lib.brick_200x200();
	this.instance_18.parent = this;
	this.instance_18.setTransform(358.3,734.6,0.2,0.2);

	this.instance_19 = new lib.brick_200x200();
	this.instance_19.parent = this;
	this.instance_19.setTransform(318.3,734.6,0.2,0.2);

	this.instance_20 = new lib.brick_200x200();
	this.instance_20.parent = this;
	this.instance_20.setTransform(278.3,734.6,0.2,0.2);

	this.instance_21 = new lib.brick_200x200();
	this.instance_21.parent = this;
	this.instance_21.setTransform(238.3,734.6,0.2,0.2);

	this.instance_22 = new lib.brick_200x200();
	this.instance_22.parent = this;
	this.instance_22.setTransform(198.3,734.6,0.2,0.2);

	this.instance_23 = new lib.brick_200x200();
	this.instance_23.parent = this;
	this.instance_23.setTransform(158.3,734.6,0.2,0.2);

	this.instance_24 = new lib.brick_200x200();
	this.instance_24.parent = this;
	this.instance_24.setTransform(118.3,734.6,0.2,0.2);

	this.instance_25 = new lib.brick_200x200();
	this.instance_25.parent = this;
	this.instance_25.setTransform(78.3,734.6,0.2,0.2);

	this.instance_26 = new lib.brick_200x200();
	this.instance_26.parent = this;
	this.instance_26.setTransform(38.3,734.6,0.2,0.2);

	this.instance_27 = new lib.brick_200x200();
	this.instance_27.parent = this;
	this.instance_27.setTransform(-1.7,734.6,0.2,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,694.6,559.9,80);


(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EBHWA8wMiPUAAAMAAAh5fMCP9AAAMAAAB5fg");
	mask.setTransform(458.5,385.9);

	// Layer 1
	this.instance = new lib._4584();
	this.instance.parent = this;
	this.instance.setTransform(-6.2,-6.2,1.802,1.802);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.2,-2.9,925.4,777.8);


// stage content:
(lib.backgroundcanvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;