/*global _:true, T3:true */

T3.Model = function() {
	this.xCells = 3;
	this.yCells = 3;
	this.players = [new T3.Player('X'), new T3.Player('O')];
	this.currentPlayer = {};
	this.winner = null;

	this.board = new Array;
	for(var x = 0; x <= this.xCells; x++) {
		this.board[x] = []; 
		for(var y = 0; y <= this.xCells; y++) {
			this.board[x][y] = null;
		}
	}
};

T3.Player = function(name) {
	this.name = name;
};

T3.Model.prototype.restart = function() {
	this.winner = null;
	this.currentPlayer = this.players[Math.floor(Math.random() * 2)]; 
	for(var x = 0; x <= this.xCells; x++) {
		for(var y = 0; y <= this.xCells; y++) {
			this.board[x][y] = null;
		}
	}
};

T3.Model.prototype.move = function(pixelX, pixelY) {
	var canvas = $("#canvas");	
	var widthInPixels = canvas.width();
	var heightInPixels = canvas.height();
	var cellWidthInPixels = widthInPixels / this.xCells;
	var cellHeightInPixels = heightInPixels / this.xCells;

	var x = Math.floor(pixelX / cellWidthInPixels);	//find the x index of the cell
	var y = Math.floor(pixelY / cellHeightInPixels); //find the y index of the cell

	if(!(this.board[x][y])) {
		this.board[x][y] = this.currentPlayer.name;
		this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
	}
};

T3.Model.prototype.getWinner = function() {
	var winner = null;

	//check for a winner in the columns:
	for(var x = 0; x < this.xCells; x++) {
		if(this.board[x][1]) {
			if(this.board[x][1] === this.board[x][0] && this.board[x][1] === this.board[x][2]) {
				winner = this.board[x][1];
			}
		}
	}

	//check for a winner in the rows:
	for(var y = 0; y < this.xCells; y++) {
		if(this.board[1][y]) {
			if(this.board[1][y] === this.board[0][y] && this.board[1][y] === this.board[2][y]) {
				winner = this.board[1][y];
			}
		}
	}

	//check for a winner in the diagonals:
	if(this.board[1][1]) {
		if(this.board[1][1] === this.board[0][0] && this.board[1][1] === this.board[2][2]) {
			winner = this.board[1][1];
		}
		else if(this.board[1][1] === this.board[0][2] && this.board[1][1] === this.board[2][0]) {
			winner = this.board[1][1];
		}
	}

	return winner;
};