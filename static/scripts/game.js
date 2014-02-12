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

var bgm = document.getElementById('overworld');
bgm.play();
var is_playing = true;

//Tileset stuff
var ts = new tileset();
var layer = [[0,1,0],[0,0,0]];
ts.layers.push(layer);

//stuff specific to me
var me = new dinosaur();

//all other dinos
var enemy = [];

function startGame() {
	/*make random*/
	me.x = 200;
	me.y = 200;
	begin();
}

function dinosaur() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	this.type = 'apatosaurus';
	this.speed = 2;
	
	this.sprite = new Image();
	this.sprite.src = "static/resources/tricerotops.png";
	
	this.key_up = 87;	//w
	this.key_down = 83;	//s
	this.key_left = 65;	//a
	this.key_right = 68;//d
}

function tileset() {
	this.image = new Image();
	this.image.src = 'static/resources/tileset.png';
	
	this.tile_size = 32;			// The size of a tile (32x32)
	this.rows = H/32+1;			// The number of tiles in a row of our background
	this.cols = W/32+1;			// The number of tiles in a column of our background
	this.tiles_in_image = 16;	// The number of tiles per row in the tileset
	
	this.layers = [];
	
	this.drawTiles = (function(context) {
		for(var r=0; r<this.rows; r++) {
			for(var c=0; c<this.cols; c++) {
				for(var i=0; i<this.layers.length; i++) {
					var layer = this.layers[i];
					var tile = 0;
					if(layer.length > r && layer[r].length > c) { tile = layer[r][c]; }
					else if(i > 0) tile = -1;
					if(tile >= 0) {
						var tile_row = (tile / this.tiles_in_image) | 0; // Bitwise OR operation
						var tile_col = (tile % this.tiles_in_image) | 0;
						context.drawImage(this.image, (tile_col * this.tile_size), (tile_row * this.tile_size), this.tile_size, this.tile_size, (c * this.tile_size), (r * this.tile_size), this.tile_size, this.tile_size);
					}
				}
			}
		}
	});
}

//handle keys
document.addEventListener('keydown', function(evt) { 
	switch(evt.keyCode) {
		case me.key_up:
			key_up = true; break;
		case me.key_down:
			key_down = true; break;
		case me.key_left:
			key_left = true; break;
		case me.key_right:
			key_right = true; break;
		case 77:
			if(is_playing) bgm.pause();
			else bgm.play();
			is_playing = !is_playing;
			break;
		case 67:
			me.x = W/2;
			me.y = H/2;
			break;
		default:
			break;
	}
});

document.addEventListener('keyup', function(evt) { 
	switch(evt.keyCode) {
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
	//TODO collision detection
	if(key_up && key_left) { me.x-=me.speed*Math.sqrt(2); me.y-=me.speed*Math.sqrt(2); }
	else if(key_up && key_right) { me.x+=me.speed*Math.sqrt(2); me.y-=me.speed*Math.sqrt(2); }
	else if(key_down && key_left) { me.x-=me.speed*Math.sqrt(2); me.y+=me.speed*Math.sqrt(2); }
	else if(key_down && key_right) { me.x+=me.speed*Math.sqrt(2); me.y+=me.speed*Math.sqrt(2); }
	else if(key_up) { me.y-=me.speed; }
	else if(key_down) { me.y+=me.speed; }
	else if(key_left) { me.x-=me.speed; }
	else if(key_right) { me.x+=me.speed; }
}

function draw() {
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(0, 1, 0, 1)";
	ctx.fillRect(0, 0, W, H);
	
	ts.drawTiles(ctx);
	
	/*ctx.beginPath();
	ctx.fillStyle = '#ff0000';
	ctx.arc(me.x, me.y, 10, Math.PI*2, false);
	ctx.fill();*/
	
	ctx.beginPath();
	ctx.drawImage(me.sprite, me.x, me.y);
	
	for(var i = 0; i < enemy.length; i++)
	{
		console.log("drawing enemy!!");
		var en = enemy[i];
		ctx.drawImage(en.sprite, en.x, en.y);
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
var socket = new WebSocket('ws://testapp.radicaldinosaur.com/echo');

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
