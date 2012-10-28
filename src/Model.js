/*global _:true, T3:true */

T3.Model = function() {
	this.players = [new T3.Player('X'), new T3.Player('O')];
};

T3.Player = function(name) {
	this.name = name;
};

T3.Model.prototype.setupTicTacToe = function() {
	this.xCells = 3;
	this.yCells = 3;
	this.winnerSize = 3;
	this.gravity = 0;
	this.restart();
};

T3.Model.prototype.setupConnect4 = function() {
	this.xCells = 10;
	this.yCells = 10;
	this.winnerSize = 4;
	this.gravity = 1;
	this.restart();
};

T3.Model.prototype.restart = function() {
	this.currentPlayer = this.players[Math.floor(Math.random() * 2)];
	this.board = [];
	for(var x = 0; x < this.xCells; x++) {
		this.board[x] = [];
		for(var y = 0; y < this.yCells; y++) {
			this.board[x][y] = null;
		}
	}
};

T3.Model.prototype.move = function(x, y) {
	if(!(this.board[x][y])) {
		if(this.gravity) {
			for(y = this.yCells - 1; y >= 0; y--) {
				if(!(this.board[x][y])) {
					break;
				}
			}
		}
		this.board[x][y] = this.currentPlayer.name;
		this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
	}
};

T3.Model.prototype.checkRow = function(x, y) {
	var count = 1;

	for(var xx = x; xx > 0 && xx >= x - this.winnerSize; xx--) {
		if(this.board[xx][y] === this.board[xx - 1][y] && this.board[xx][y] === this.board[x][y]) {
			count++;
		}
	}

	for(xx = x; xx < this.xCells - 1 && xx <= x + this.winnerSize; xx++) {
		if(this.board[xx][y] === this.board[xx + 1][y] && this.board[xx][y] === this.board[x][y]) {
			count++;
		}
	}

	if(count >= this.winnerSize) {
		return true;
	} else {
		return false;
	}
};

T3.Model.prototype.checkColumn = function(x, y) {
	var count = 1;
	for(var yy = y; yy > 0 && yy >= y - this.winnerSize; yy--) {
		if(this.board[x][yy] === this.board[x][yy - 1] && this.board[x][yy] === this.board[x][y]) {
			count++;
		}
	}

	for(yy = y; yy < this.yCells - 1 && yy <= y + this.winnerSize; yy++) {
		if(this.board[x][yy] === this.board[x][yy + 1] && this.board[x][yy] === this.board[x][y]) {
			count++;
		}
	}

	if(count >= this.winnerSize) {
		return true;
	} else {
		return false;
	}
};

//checks the diagonal going from top left to bottom right
T3.Model.prototype.checkLeftDiagonal = function(x, y) {
	var xx = x;
	var yy = y;
	var count = 1;
	while(xx > 0 && xx >= x - this.winnerSize && yy > 0 && yy >= y - this.winnerSize) {

		if(this.board[xx][yy] === this.board[xx - 1][yy - 1] && this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx--;
		yy--;
	}

	xx = x;
	yy = y;

	while(xx < this.xCells - 1 && xx <= x + this.winnerSize && yy < this.yCells - 1 && yy <= y + this.winnerSize) {

		if(this.board[xx][yy] === this.board[xx + 1][yy + 1] && this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx++;
		yy++;
	}

	if(count >= this.winnerSize) {
		return true;
	} else {
		return false;
	}
};

//checks the diagonal going from top right to bottom left
T3.Model.prototype.checkRightDiagonal = function(x, y) {
	var xx = x;
	var yy = y;
	var count = 1;
	while(xx < this.xCells - 1 && xx <= x + this.winnerSize && yy > 0 && yy >= y - this.winnerSize) {
		if(this.board[xx][yy] === this.board[xx + 1][yy - 1] && this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx++;
		yy--;
	}

	xx = x;
	yy = y;

	while(xx > 0 && xx >= x - this.winnerSize && yy < this.yCells - 1 && yy <= y + this.winnerSize) {
		if(this.board[xx][yy] === this.board[xx - 1][yy + 1] && this.board[xx][yy] === this.board[x][y]) {
			count++;
		}
		xx--;
		yy++;
	}

	if(count >= this.winnerSize) {
		return true;
	} else {
		return false;
	}
};

T3.Model.prototype.checkWinner = function(x, y) {
	//this if statement returns true if any of the check methods returns
	//true, and returns false if all of them return false:
	if(this.checkRow(x, y) || this.checkColumn(x, y) || this.checkLeftDiagonal(x, y) || this.checkRightDiagonal(x, y)) {
		return true;
	} else {
		return false;
	}
};

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