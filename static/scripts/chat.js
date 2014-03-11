function chat(id) {
	this.messages = [];
	this.history = 20;
	this.player_id = (id === undefined)? 0 : id;
	this.last_read = -1;
	
	this.sendMessage = (function(msg, websocket) {
		var message = { player : this.player_id, message : msg };
		websocket.send(JSON.stringify({cmd: "chat", data: message}));
	});
	
	this.receiveMessage = (function(player, msg) {
		if(player === undefined || msg === undefined) return null;
		this.messages.splice(0,0,{player : player, message : msg, opacity : 1});
		this.last_read++;
		//if the array is too long, chop off the offending elements
		if(this.messages.length > this.history) this.messages.splice(this.history,(this.messages.length - this.history));
	});
	
	this.displayMessages = (function(context, scrWidth, scrHeight) {
		for(int i=this.messages.length; i>-1; i--) {
			ctx.fillStyle = "rgba(255,255,255,"+this.messages[i].opacity+")";
			ctx.font = "bold 12px sans-serif";
			ctx.fillText(this.messages[i].player+": "+this.messages[i].message, scrWidth/2, scrHeight-(i*40));
			if(this.messages[i].opacity > 0) this.messages[i].opacity -= 0.01;
		}
	});
}