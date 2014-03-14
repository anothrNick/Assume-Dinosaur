function dinosaur() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	this.id = 0;
	
	this.type = 'triceratops'; //default type
	this.speed = 2;
	this.typing = false;
	
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
	this.key_typing = 13;//enter
	this.key_submit = 13;
	this.key_escape = 27;//escape
	
	this.moving = false;
	this.dir = 6; //0=N,1=NE,2=E,3=SE,4=S,5=SW,6=W,7=NW
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
	
	this.drawSprite = (function(context, drawX, drawY) {
		context.drawImage(this.sprite, this.sprite_x, this.sprite_y, this.sprite_width, this.sprite_height, drawX, drawY, this.sprite_width, this.sprite_height);
	});
}
