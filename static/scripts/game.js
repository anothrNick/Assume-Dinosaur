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

//the chat feature
var messages = new chat(0);

function startGame() {
	/*make random*/
	me.x = 200;
	me.y = 500;
	begin();
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
	
	//TODO: loop through all layers and place dinos in each layer appropriately (by z-index)
	ts.drawTiles(ctx, tsOffsetX, tsOffsetY, W, H, 0);
	
	ctx.beginPath();
	me.updateSprite();
	me.drawSprite(ctx, meX, meY);
	
	for(var i = 0; i < enemy.length; i++)
	{
		//TODO: animate enemy properly (give direction and moving|not moving)
		var en = enemy[i];
		if(en.moving == false) en.moving = true;
		en.updateSprite();
		en.drawSprite(ctx, en.x+tsOffsetX, en.y+tsOffsetY);
		//draw ID's above each other dino
		ctx.fillStyle = "Blue";
		ctx.font = "bold 12px sans-serif";
		ctx.fillText("ID: " + en.id, en.x + en.sprite_width / 2, en.y - 15);
 		ctx.fillText("("+en.x+", "+en.y+")", en.x + en.sprite_width / 2, en.y);
	}
	
	messages.displayMessages(ctx, W, H);
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
		me.id = ourID;
		messages.player_id = ourID;
	}
	else if(message.cmd === "chat") {
		var data = message.data;
		messages.receiveMessage(data.player, data.message);
	}
	else if(message.cmd === "remove") {
		console.log(message);
		$(enemy).each(function(i){
			if(this["id"] == message.data.player) enemy.splice(i,1);
			var remMsg = "** removed player ( " + message.data.player + " ) - client disconnected";
			console.log(remMsg);
			messages.receiveMessage(0, remMsg);
		});
	}
}

socket.onerror = function(err) { console.log(err); }

startGame();

//this exists for the sole purpose of testing the chat
function sendChatMessage() {
	var message = document.getElementById('chatbox').value;
	messages.sendMessage(message, socket);
}

window.onbeforeunload = function() {
	console.log("leaving");
	sendData("remove", {player: ourID})
}
