//Initializing the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas dimensions
var W = window.innerWidth; 
var H = window.innerHeight;

canvas.style.width = W;
canvas.style.height = H;
ctx.canvas.width = W;
ctx.canvas.height = H;

var key_up = false;
var key_down = false;
var key_left = false;
var key_right = false;
var keyOrder = [];

var bgm = document.getElementById('overworld');
bgm.play();
var is_playing = true;

//Tileset stuff
var ts = new tileset();
var layer = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
	[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
	[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
	[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
	[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
	[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
	[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
	[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]
];
ts.layers.push(layer);
ts.updateTiles();

var things = new objectset();
var objects = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,0],
	[0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
	[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
	[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
	[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
	[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
	[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
	[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
];
things.layers.push(objects);

//stuff specific to me
var me = new dinosaur();

//all other dinos
var enemy = [];

function startGame() {
	/*make random*/
	me.x = 200;
	me.y = 500;
	begin();
}

function dinosaur() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	this.type = 'triceratops';
	this.speed = 2;
	
	this.sprite = new Image();
	this.sprite.src = "static/resources/triceratops.png";
	this.sprite_y_start = [0,0,0,0,0,0,0,0];
	this.sprite_widths = [78,78,78,78,78,78,78,78]; 
	this.sprite_heights = [40,40,40,40,40,40,40,40]; 
	this.sprite_frames = [8,8,8,8,8,8,8,8]; 
	
	this.sprite_x = 0;
	this.sprite_y = 0;
	this.sprite_width = 0;
	this.sprite_height = 0;
	this.sprite_frame = 0;
	
	this.key_up = 87;		//w
	this.key_down = 83;	//s
	this.key_left = 65;	//a
	this.key_right = 68;	//d
	
	this.moving = false;
	this.dir = 6; //0=N,1=NE,2=E,3=SE,4=S,5=SW,6=W,7=NW ---Not yet used, is the index of this.sprite_*
	this.animation_counter = 0;
	
	this.updateSprite = (function() {
		if(this.moving) this.animation_counter++;
		if(this.animation_counter >= 4) {
			this.animation_counter = 0;
			this.sprite_frame++;
			if(this.sprite_frame >= this.sprite_frames[6]) this.sprite_frame = 0;
		}
		this.sprite_x = this.sprite_frame * this.sprite_widths[6];
		this.sprite_y = this.sprite_height * this.sprite_y_start[6];
		this.sprite_width = this.sprite_widths[6];
		this.sprite_height = this.sprite_heights[6];
	});
}

//should this be its own file?
function tileset() {
	this.image = new Image();
	this.image.src = 'static/resources/tileset.png';
	
	this.tile_size = 32;			// The size of a tile (32x32)
	this.rows = 0;					// The number of tiles in a row of our background
	this.cols = 0;					// The number of tiles in a column of our background
	this.tiles_in_image = 16;	// The number of tiles per row in the tileset
	
	this.layers = [];
	this.waterAnimCounter = 0;
	this.waterDisplacement = 0;
	this.waterDisplacementMod = 1;
	
	this.getHeight = (function() { return (this.layers[0] === undefined)? 0 : this.layers[0].length*this.tile_size; });
	this.getWidth = (function() { return (this.layers[0] === undefined || this.layers[0][0] === undefined)? 0 : this.layers[0][0].length*this.tile_size; });
	
	this.updateTiles = (function() {
		this.rows = (this.layers[0] === undefined)? 0 : this.layers[0].length*this.tile_size;
		this.cols = (this.layers[0] === undefined || this.layers[0][0] === undefined)? 0 : this.layers[0][0].length*this.tile_size;
	});
	
	//TODO: optimize this better, separate layer drawing (was a bad idea to initially combine it)
	this.drawTiles = (function(context, startX, startY, scrWidth, scrHeight) {
		for(var r=0; r<this.rows; r++) {
			if((r*this.tile_size)-Math.floor(startY) < -1*this.tile_size || (r*this.tile_size)-Math.floor(startY) > scrHeight) continue;
			for(var c=0; c<this.cols; c++) {
				if((c*this.tile_size)-Math.floor(startX) < -1*this.tile_size || (c*this.tile_size)-Math.floor(startX) > scrWidth) continue;
				for(var i=0; i<this.layers.length; i++) {
					var layer = this.layers[i];
					var tile = 0;
					if(layer.length > r && layer[r].length > c) { tile = layer[r][c]; }
					else if(i > 0) tile = -1;
					if(tile >= 0) {
						var tile_row = (tile / this.tiles_in_image) | 0; // Bitwise OR operation
						var tile_col = (tile % this.tiles_in_image) | 0;
						context.drawImage(this.image, (tile_col * this.tile_size), (tile_row * this.tile_size), this.tile_size, this.tile_size, (c * this.tile_size)-Math.floor(startX), (r * this.tile_size)-Math.floor(startY), this.tile_size, this.tile_size);
						//animate water--currently disabled: if(tile == 16) context.drawImage(this.image, (tile_col * this.tile_size), (tile_row * this.tile_size), this.tile_size, this.tile_size, (c * this.tile_size)+this.waterDisplacement, (r * this.tile_size), this.tile_size, this.tile_size);
					}
				}
			}
		}
		this.waterAnimCounter++;
		if(this.waterAnimCounter > 8) { this.waterAnimCounter = 0; this.waterDisplacement += this.waterDisplacementMod; }
		if(this.waterDisplacement > 3 || this.waterDisplacement < -3) this.waterDisplacementMod *= -1;
	});
}

//handle keys
document.addEventListener('keydown', function(evt) { 
	switch(evt.keyCode) {
		case me.key_up:
			key_up = true; 
			if(keyOrder.indexOf(me.key_up) == -1) keyOrder.push(me.key_up); 
			break;
		case me.key_down:
			key_down = true; 
			if(keyOrder.indexOf(me.key_down) == -1) keyOrder.push(me.key_down); 
			break;
		case me.key_left:
			key_left = true; 
			if(keyOrder.indexOf(me.key_left) == -1) keyOrder.push(me.key_left); 
			break;
		case me.key_right:
			key_right = true;
			if(keyOrder.indexOf(me.key_right) == -1) keyOrder.push(me.key_right); 
			break;
		case 77:
			if(is_playing) bgm.pause();
			else bgm.play();
			is_playing = !is_playing;
			break;
		case 67: //recenter dinosaur -- to be removed
			me.x = W/2;
			me.y = H/2;
			break;
		default:
			break;
	}
});

document.addEventListener('keyup', function(evt) { 
	var key = evt.keyCode;
	if(keyOrder.indexOf(key) > -1) {
		keyOrder.splice(keyOrder.indexOf(key), 1);
	}
	switch(key) {
		case me.key_up:
			key_up = false; break;
		case me.key_down:
			key_down = false; break;
		case me.key_left:
			key_left = false; break;
		case me.key_right:
			key_right = false; break;
		default:
			break;
	}
});

function move() {
	me.moving = (key_up || key_down || key_left || key_right);
	if(me.moving) {
		var up = false, down = false, left = false, right = false;
		//determine direction
		for(var i=0; i<keyOrder.length; i++) {
			if(keyOrder[i] == me.key_up && !down) up = true;
			else if(keyOrder[i] == me.key_down && !up) down = true;
			else if(keyOrder[i] == me.key_left && !right) left = true;
			else if(keyOrder[i] == me.key_right && !left) right = true;
		}
		//test movement
		var newx = me.x;
		var newy = me.y;
		if(up && left) { newx-=me.speed/Math.sqrt(2); newy-=me.speed/Math.sqrt(2); }
		else if(up && right) { newx+=me.speed/Math.sqrt(2); newy-=me.speed/Math.sqrt(2); }
		else if(down && left) { newx-=me.speed/Math.sqrt(2); newy+=me.speed/Math.sqrt(2); }
		else if(down && right) { newx+=me.speed/Math.sqrt(2); newy+=me.speed/Math.sqrt(2); }
		else if(up) { newy-=me.speed; }
		else if(down) { newy+=me.speed; }
		else if(left) { newx-=me.speed; }
		else if(right) { newx+=me.speed; }
		if(!things.isSolid(newx,newy,me.z)) { //very rudimentary collision detection, to be improved
			me.x = newx;
			me.y = newy;
		} 
		else if(newx != me.x && !things.isSolid(newx,me.y,me.z)) me.x = newx;
		else if(newy != me.y && !things.isSolid(me.x,newy,me.z)) me.y = newy;
	}
}

function draw() {
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(0, 1, 0, 1)";
	ctx.fillRect(0, 0, W, H);
	
	var tsOffsetX = 0, tsOffsetY = 0, meX = W/2, meY = H/2;
	if(me.x - W/2 <= 0) meX = me.x;
	else if(me.x + W/2 >= ts.getWidth()) { meX = W - (ts.getWidth() - me.x); tsOffsetX = ts.getWidth()-W; }
	else tsOffsetX = me.x - W/2;
	if(me.y - H/2 <= 0) meY = me.y;
	else if(me.y + H/2 >= ts.getHeight()) { meY = H - (ts.getHeight() - me.y); tsOffsetY = ts.getHeight()-H; }
	else tsOffsetY = me.y - H/2;
	
	ts.drawTiles(ctx, tsOffsetX, tsOffsetY, W, H);
	
	ctx.beginPath();
	me.updateSprite();
	ctx.drawImage(me.sprite, me.sprite_x, me.sprite_y, me.sprite_width, me.sprite_height, meX, meY, me.sprite_width, me.sprite_height);
	
	for(var i = 0; i < enemy.length; i++)
	{
		//TODO: animate enemy
		//console.log("drawing enemy!!");
		var en = enemy[i];
		if(en.moving == false) en.moving = true;
		en.updateSprite();
		//ctx.drawImage(en.sprite, en.x, en.y);
		ctx.drawImage(en.sprite, en.sprite_x, en.sprite_y, en.sprite_width, en.sprite_height, en.x, en.y, en.sprite_width, en.sprite_height);
		ctx.fillStyle = "Blue";
		ctx.font = "bold 12px sans-serif";
		ctx.fillText("ID: " + en.id, en.x + en.sprite_width / 2, en.y - 15);
 		ctx.fillText("("+en.x+", "+en.y+")", en.x + en.sprite_width / 2, en.y);
	}
}

function render() {
	if(window.innerWidth != W || window.innerHeight != H) {
		W = window.innerWidth; 
		H = window.innerHeight;	
		canvas.style.width = W;
		canvas.style.height = H;
		ctx.canvas.width = W;
		ctx.canvas.height = H;
		ts.rows = H/32+1;
		ts.cols = W/32+1;
	}
	
	move();
	draw();
	update();
}

function update() {
	//console.log(socketOpen);
	if(socketOpen == true) sendData("update", {x:me.x,y:me.y,id:ourID});
}

function begin() { window.setInterval(render, 33); }

function sendData(cmd, data) {
	socket.send(JSON.stringify({cmd: cmd, data: data}));
}

var socketOpen = false;
/*WEBSOCKETS*/
var socket = new WebSocket('ws://radicaldinosaur.com/echo');

socket.onopen = function() {
	/*initialize client to server*/
	socket.send(JSON.stringify({cmd: "ping"}));
	socketOpen = true;
}

var ourID;
socket.onmessage = function(msg) {
	message = $.parseJSON(msg.data);
	if(message.cmd == "update") {
		var data = message.data;
		//data = [{x:<value>, y:<value>}]
                //console.log(message);
		var bFound = false;
		var eid = data.id;
		for(var i = 0; i < enemy.length; i++)
		{
			if(enemy[i].id == eid)
			{
				enemy[i].x = data.x;
				enemy[i].y = data.y;
				bFound = true;
			}
                        if(enemy[i].id == undefined) enemy.splice(i,1);
		}
		if(bFound == false){
			var en = new dinosaur();
			en.x = data.x;
			en.y = data.y;
			en.id = eid;
			enemy[enemy.length] = en; 
		}
	}
	else if(message.cmd === "response"){
		ourID = message.id;
		console.log("Received ID: ( " + ourID +" )");
	}
}

socket.onerror = function(err) { console.log(err); }

startGame();
