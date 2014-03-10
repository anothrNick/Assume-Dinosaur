function chat(id) {
	this.messages = [];
	this.history = 20;
	this.player_id = (id === undefined)? 0 : id;
	this.last_read = -1;
	this.socket = null; //make websocket here
	
	this.sendMessage = (function(msg) {
		var message = { player : this.player_id, message : msg };
		//websockets magic here
	});
	
	this.checkMessages = (function() {
		if(this.last_read > -1) {
			var to_read = [];
			for(int i=this.last_read; i>-1; i++) {
				to_read.push(this.messages[i]);
			}
			this.last_read = -1;
			return to_read;
		}
		return [];
	});
	
	//on message for websockets, add a message to the beginning of the array, and remove any messages past this.history index (to save memory). Increment this.last_read by one.
}