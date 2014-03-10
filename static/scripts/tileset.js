function tileset() {
	this.image = new Image();
	this.image.src = 'static/resources/tileset.png';
	
	this.tile_size = 32;			// The size of a tile (32x32)
	this.rows = 0;//this.getWidth()/32+1;			// The number of tiles in a row of our background
	this.cols = 0;//this.getHeight()/32+1;			// The number of tiles in a column of our background
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
	
	this.drawTiles = (function(context, startX, startY, scrWidth, scrHeight, ly) {
		if(this.layers[ly] === undefined) return;
		var layer = this.layers[ly];
		startY = Math.floor(startY);
		startX = Math.floor(startX);
		for(var r=0; r<this.rows; r++) {
			if((r*this.tile_size)-startY < -1*this.tile_size || (r*this.tile_size)-startY > scrHeight) continue;
			for(var c=0; c<this.cols; c++) {
				if((c*this.tile_size)-startX < -1*this.tile_size || (c*this.tile_size)-startX > scrWidth) continue;
					var tile = 0;
					if(layer.length > r && layer[r].length > c) { tile = layer[r][c]; }
					else if(ly > 0) tile = -1;
					if(tile >= 0) {
						var tile_row = (tile / this.tiles_in_image) | 0; // Bitwise OR operation
						var tile_col = (tile % this.tiles_in_image) | 0;
						context.drawImage(this.image, (tile_col * this.tile_size), (tile_row * this.tile_size), this.tile_size, this.tile_size, (c * this.tile_size)-startX, (r * this.tile_size)-startY, this.tile_size, this.tile_size);
						//if(tile == 16) context.drawImage(this.image, (tile_col * this.tile_size), (tile_row * this.tile_size), this.tile_size, this.tile_size, (c * this.tile_size)+this.waterDisplacement, (r * this.tile_size), this.tile_size, this.tile_size);
				}
			}
		}
		this.waterAnimCounter++;
		if(this.waterAnimCounter > 8) { this.waterAnimCounter = 0; this.waterDisplacement += this.waterDisplacementMod; }
		if(this.waterDisplacement > 3 || this.waterDisplacement < -3) this.waterDisplacementMod *= -1;
	});
}