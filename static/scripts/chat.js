function chat(id) {
	this.messages = [];
	this.history = 12;
	this.player_id = (id === undefined)? 0 : id;
	
	this.sendMessage = (function(msg, websocket) {
		var message = { player : this.player_id, message : msg };
  		websocket.send(JSON.stringify({cmd: "chat", data: message}));
	});
	
	this.receiveMessage = (function(player, msg) {
		if(player === undefined || msg === undefined) return null;
		this.messages.splice(0,0,{player : player, message : msg, opacity : 1});
		//if the array is too long, chop off the offending elements
		if(this.messages.length > this.history) this.messages.splice(this.history,(this.messages.length - this.history));
	});
	
	this.displayMessages = (function(context, scrWidth, scrHeight) {
		var startY = -1;
		for(var i=this.messages.length-1; i>-1; i--) {
			if(this.messages[i].opacity > 0) { startY = scrHeight-(i*20)-75; break; }
		}
		if(startY > -1) {
			context.fillStyle = "rgba(0,0,0,0.1)";
			context.fillRect(10, startY, scrWidth-20, scrHeight-startY-55);
		}
		for(var i=this.messages.length-1; i>-1; i--) {
			var pid = this.messages[i].player;
			context.fillStyle = "rgba(255,255,255,"+this.messages[i].opacity+")";
			context.font = "bold 12px sans-serif";
			context.fillText((pid == 0 ? "" : "player-" + pid +": ")+this.messages[i].message, 15, scrHeight-(i*20)-60);
			if(this.messages[i].opacity > 0.005) this.messages[i].opacity -= 0.005;
			else this.messages[i].opacity = 0;
		}

	});
	
	this.drawCurrentMessage = (function(context, message, scrWidth, scrHeight) {
		context.fillStyle = "rgba(255,255,255,1)";
		context.font = "bold 12px sans-serif";
		context.fillText(message, 15, scrHeight-30);
	});
	
	this.drawFullHistory = (function(context, scrWidth, scrHeight) {
		var startY = scrHeight-(this.messages.length-1)*20-75;
		context.fillStyle = "rgba(0,0,0,0.1)";
		context.fillRect(10, startY, scrWidth-20, scrHeight-startY-55);
		for(var i=this.messages.length-1; i>-1; i--) {
			var pid = this.messages[i].player;
			context.fillStyle = "rgba(255,255,255,1)";
			context.font = "bold 12px sans-serif";
			context.fillText((pid == 0 ? "" : "player-" + pid +": ")+this.messages[i].message, 15, scrHeight-(i*20)-60);
		}
	});
}
