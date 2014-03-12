function chat(id) {
	this.messages = [];
	this.history = 12;
	this.player_id = (id === undefined)? 0 : id;
	this.last_read = -1;
	
	this.sendMessage = (function(msg, websocket) {
		var message = { player : this.player_id, message : msg };
		console.log("Sent: " + message);
  		websocket.send(JSON.stringify({cmd: "chat", data: message}));
	});
	
	this.receiveMessage = (function(player, msg) {
		if(player === undefined || msg === undefined) return null;
		console.log("Received: " + msg);
		this.messages.splice(0,0,{player : player, message : msg, opacity : 1});
		this.last_read++;
		//if the array is too long, chop off the offending elements
		if(this.messages.length > this.history) this.messages.splice(this.history,(this.messages.length - this.history));
	});
	
	this.displayMessages = (function(context, scrWidth, scrHeight) {
		for(var i=this.messages.length-1; i>-1; i--) {
			var pid = this.messages[i].player;
//			console.log(this.messages[i]);
			ctx.fillStyle = "rgba(255,255,255,"+this.messages[i].opacity+")";
                        ctx.font = "bold 12px sans-serif";
			ctx.fillText((pid == 0 ? "" : "player-" + pid +": ")+this.messages[i].message, 15, scrHeight-(i*20)-30);
			if(this.messages[i].opacity > 0) this.messages[i].opacity -= 0.01;
		}

	});
}
