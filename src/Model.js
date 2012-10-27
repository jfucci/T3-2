/*global _:true, T3:true */

T3.Model = function() {
	this.xCells = 3;
	this.yCells = 3;
	this.winnerSize = 3;
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

T3.Model.prototype.checkRow = function(x, y) {
	var count = 1;

	for(var xx = x; xx > 0 && xx >= x - this.winnerSize; xx--) {
		if(this.board[xx][y] === this.board[xx-1][y] && this.board[xx][y] === this.board[x][y]) {
			count++;
		}
	}
	
	for(var xx = x; xx < this.xCells && xx <= x + this.winnerSize; xx++) {
		if(this.board[xx][y] === this.board[xx+1][y] && this.board[xx][y] === this.board[x][y]) {
			count++;
		}
	}

	if(count >= this.winnerSize) { return true; }
	else { return false; }
};

T3.Model.prototype.checkColumn = function(x, y) {
	var yy = y;
	var count = 1;
	for(var yy = y; yy > 0 && yy >= y - this.winnerSize; yy--) {
		if(this.board[x][yy] === this.board[x][yy-1] && this.board[x][yy] === this.board[x][y]) {
			count++;
		}
	}

	for(var yy = y; yy < this.yCells && yy <= y + this.winnerSize; yy++) {
		if(this.board[x][yy] === this.board[x][yy+1] && this.board[x][yy] === this.board[x][y]) {
			count++;
		}
	}

	if(count >= this.winnerSize) { return true; }
	else { return false; }
};

//checks the diagonal going from top left to bottom right
T3.Model.prototype.checkLeftDiagonal = function(x, y) {
	var xx = x;
	var yy = y;
	var count = 1;
	while (xx > 0 && xx >= x - this.winnerSize 
		&& yy > 0 && yy >= y - this.winnerSize) {

		if(this.board[xx][yy] === this.board[xx-1][yy-1] 
			&& this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx--; yy--;
	}

	xx = x; yy = y;
	
	while (xx < this.xCells && xx <= x + this.winnerSize 
		&& yy < this.yCells && yy <= y + this.winnerSize) {

		if(this.board[xx][yy] === this.board[xx+1][yy+1] 
			&& this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx++; yy++;
	}

	if(count >= this.winnerSize) { return true; }
	else { return false; }
};

//checks the diagonal going from top right to bottom left
T3.Model.prototype.checkRightDiagonal = function(x, y) {
	var xx = x;
	var yy = y;
	var count = 1;
	while (xx < this.xCells && xx <= x + this.winnerSize
		&& yy > 0 && yy >= y - this.winnerSize) {

		if(this.board[xx][yy] === this.board[xx+1][yy-1] 
			&& this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx++; yy--;
	}

	xx = x; yy = y; 
	
	while (xx > 0 && xx >= x - this.winnerSize 
		&& yy < this.yCells && yy <= y + this.winnerSize) {

		if(this.board[xx][yy] === this.board[xx-1][yy+1] 
			&& this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx--; yy++;
	}

	if(count >= this.winnerSize) { return true; }
	else { return false; }
};

T3.Model.prototype.checkWinner = function(x, y) {
	//this switch statement returns true if any of the check methods returns
	//true, and returns false if all of them return false:
	switch(true) {
		case this.checkRow(x, y):
			return true; 
			break;
		case this.checkColumn(x, y):
			return true;
			break;
		case this.checkLeftDiagonal(x, y):
			return true;
			break;
		case this.checkRightDiagonal(x, y):
			return true;
			break;
		default:
			return false;
	}
}

T3.Model.prototype.getWinner = function() {
	var winner = null;
	for(var x = 0; x < this.xCells; x++) {
		for(var y = 0; y < this.yCells; y++) {
			if(this.board[x][y] && this.checkWinner(x, y)) {
				winner = this.board[x][y];
				break;
			}
		}
	}
	return winner;
};