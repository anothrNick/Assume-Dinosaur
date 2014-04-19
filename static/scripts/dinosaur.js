var DIR_NORTH = 0, DIR_NORTHEAST = 1, DIR_EAST = 2, DIR_SOUTHEAST = 3, DIR_SOUTH = 4, DIR_SOUTHWEST = 5, DIR_WEST = 6, DIR_NORTHWEST = 7;

function dinosaur() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	this.id = 0;
	
	this.type = 'triceratops'; //default type
	this.speed = 2;
	this.typing = false;
	this.strafing = false;
	
	this.is_hit = false;
	
	this.sprite = new Image();
	this.sprite.src = "resources/triceratops.png";
	this.sprite_y_start = [0,40,40,40,0,0,0,0];
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
	this.key_strafe = 16;//shift
	this.key_attack = 70;//f
	this.key_typing = 13;//enter
	this.key_submit = 13;
	this.key_escape = 27;//escape
	
	this.moving = false;
	this.immoble = false; //for temporarily disabling movement
	this.dir = 6; //0=N,1=NE,2=E,3=SE,4=S,5=SW,6=W,7=NW
	this.animation_counter = 0;
	this.attack_counter = 0;
	
	this.move = (function(newX, newY) {
		if(this.immoble) { this.moving = false; return; }
		newX = Math.floor(newX);
		newY = Math.floor(newY);
		if(!this.strafing) {
			if(newX < this.x && newY < this.y) this.dir = DIR_NORTHWEST;
			else if(newX < this.x && newY > this.y) this.dir = DIR_SOUTHWEST;
			else if(newX > this.x && newY < this.y) this.dir = DIR_NORTHEAST;
			else if(newX > this.x && newY > this.y) this.dir = DIR_SOUTHEAST;
			else if(newX > this.x) this.dir = DIR_EAST;
			else if(newX < this.x) this.dir = DIR_WEST;
			else if(newY > this.y) this.dir = DIR_SOUTH;
			else if(newY < this.y) this.dir = DIR_NORTH;
		}
		this.x = newX;
		this.y = newY;
	});	
	
	this.attack = (function() {
		console.log('attack!');
		this.attacking = true;
		if(this.attack_counter > 0) this.attack_counter = 0;
	});
	
	this.isAttacking = (function() {
		if(this.attacking && this.attack_counter >= 0) return true;
		return false;
	});
	
	this.updateSprite = (function() {
		if(this.moving) this.animation_counter++;
		if(this.attacking) this.attack_counter++;
		if(this.animation_counter >= 4) {
			this.animation_counter = 0;
			this.sprite_frame++;
			if(this.sprite_frame >= this.sprite_frames[this.dir]) this.sprite_frame = 0;
		}
		if(this.attack_counter >= 4) {
			this.attack_counter = -4;
		} else if(this.attack_counter == 0) this.attacking = false;
		if(this.is_hit) { this.sprite_x = this.sprite_frames[this.dir] * this.sprite_widths[this.dir]; is_hit = false; }
		else if(this.attacking && this.attack_counter >= 0) this.sprite_x = (this.sprite_frames[this.dir]+1) * this.sprite_widths[this.dir];
		else this.sprite_x = this.sprite_frame * this.sprite_widths[this.dir];
		this.sprite_y = this.sprite_y_start[this.dir];
		this.sprite_width = this.sprite_widths[this.dir];
		this.sprite_height = this.sprite_heights[this.dir];
	});
	
	this.drawSprite = (function(context, drawX, drawY) {
		context.drawImage(this.sprite, this.sprite_x, this.sprite_y, this.sprite_width, this.sprite_height, drawX, drawY, this.sprite_width, this.sprite_height);
	});
}
