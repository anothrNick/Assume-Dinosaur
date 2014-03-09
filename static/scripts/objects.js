var OBJECT_SOLID_BLOCK = 1;
var OBJECT_SOLID_TRIANGLE_NW = 2; //right triangle with NW corner empty
var OBJECT_SOLID_TRIANGLE_NE = 3; 
var OBJECT_SOLID_TRIANGLE_SE = 4;
var OBJECT_SOLID_TRIANGLE_SW = 5;
var OBJECT_WATER_SHALLOW = 20;
var OBJECT_WATER_DEEP = 21;

function objectset() {
	this.tile_size = 32;			// The size of a tile (32x32)
	
	this.layers = [];
	
	this.isSolid = (function(xpos,ypos,layer) {
		var ly = this.layers[layer];
		if(ly === undefined) return false;
		var row = Math.floor(ypos/this.tile_size) + ((ypos%this.tile_size == 0)? 0 : 1);
		var col = Math.floor(xpos/this.tile_size) + ((xpos%this.tile_size == 0)? 0 : 1);
		if(ly[row] === undefined) return false;
		if(ly[row][col] === undefined) return false;
		if(ly[row][col] < 20 && ly[row][col] > 0) return true;
		return false;
	});
}