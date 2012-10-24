/*global _:true, T3:true */

T3.Model = function() {
	this.xCells = 3;
	this.yCells = 3;
	this.players = [new T3.Player('X'), new T3.Player('O')];
	this.currentPlayer = {};
	this.winner = null;

	this.board = [];
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
	for(var x = 0; x < this.xCells; x++) {
		for(var y = 0; y < this.yCells; y++) {
			this.board[x][y] = null;
		}
	}
};

T3.Model.prototype.move = function(pixelX, pixelY) {
	var canvas = $("#canvas");	
	var widthInPixels = canvas.width();
	var heightInPixels = canvas.height();
	var cellWidthInPixels = widthInPixels / this.xCells;
	var cellHeightInPixels = heightInPixels / this.yCells;

	var x = Math.floor(pixelX / cellWidthInPixels);	//find the x index of the cell
	var y = Math.floor(pixelY / cellHeightInPixels); //find the y index of the cell

	if(!(this.board[x][y])) {
		this.board[x][y] = this.currentPlayer.name;
		this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
	}
};

T3.Model.prototype.checkRow = function(y) {
	var count = 1;
	for(var x = 0; x < this.xCells; x++) {
		if(this.board[x][y] && this.board[x][y] === this.board[x+1][y]) {
			count++;
		}
	}
	if(count === this.xCells) {
		return true;
	}
}

T3.Model.prototype.checkColumn = function(x) {
	var count = 1;
	for(var y = 0; y < this.xCells; y++) {
		if(this.board[x][y] && this.board[x][y] === this.board[x][y+1]) {
			count++;
		}
	}
	if(count === this.yCells) {
		return true;
	}
}

T3.Model.prototype.checkLeftDiagonal = function(x, y) {
	var count = 1;

	var xx;
	var yy;
	if(x > y) {
		xx = x - y;
		yy = y - y;
	}
	else{
		xx = x - x;
		yy = y - x;
	}

	for(; xx < this.xCells, yy < this.yCells; xx++, yy++) {
		if(this.board[xx][yy] && this.board[xx][yy] === this.board[xx+1][yy+1]) {
			count++;
		}
	}

	if(count === this.xCells) {
		return true;
	}
}

T3.Model.prototype.checkRightDiagonal = function(x, y) {
	var count = 1;

	total = x + y;

	if(total < (this.xCells - 1)) {
		yy = 0;
		xx = total;
	}
	else {
		yy = total - (this.yCells - 1);
		xx = total - yy;
	}


	while(xx > 0 && yy < (this.yCells - 1)) {
		if(this.board[xx][yy] && this.board[xx][yy] === this.board[xx-1][yy+1]) {
			count++;
		}
		xx--;
		yy++;
	}
		
	if(count === this.xCells) {
		return true;
	}

}

T3.Model.prototype.getWinner = function(player) {
	var winner = null;
	for(var x = 0, y = 0; x < this.xCells, y < this.yCells; x++, y++) {
		if(this.checkRow(y) || this.checkColumn(x) || this.checkLeftDiagonal(x, y) || this.checkRightDiagonal(x, y)) {
			winner = this.board[x][y];
			break;
		}
	}
	return winner;
}