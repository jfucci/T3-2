/*global _:true, T3:true */

T3.Model = function() {
	this.size = 3;
	this.players = [new T3.Player('X'), new T3.Player('O')];
	this.currentPlayer = {};
	board = new Array;
	for(var x = 0; x <= this.size; x++) {
		board[x] = []; 
		for(var y = 0; y <= this.size; y++) {
			board[x][y] = null;
		}
	}
};

T3.Player = function(name) {
	this.name = name;
};

T3.Model.prototype.restart = function() {
	this.currentPlayer = this.players[Math.floor(Math.random() * 2)]; 
	for(var x = 0; x <= this.size; x++) {
		for(var y = 0; y <= this.size; y++) {
			board[x][y] = null;
		}
	}
};

T3.Model.prototype.move = function(x,y) {
	x = Math.floor(x / 100);
	y = Math.floor(y / 100);
	if(!(board[x][y])) {
		board[x][y] = this.currentPlayer.name;
		if(this.currentPlayer.name === "X") {
		this.currentPlayer = this.players[1];
		}
		else {
			this.currentPlayer = this.players[0];
		}
	}
}