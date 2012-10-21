/*global _:true, T3:true */

T3.Model = function() {
	this.size = 3;
	this.players = [new T3.Player('X'), new T3.Player('O')];
	this.currentPlayer = {};
	this.winner = null;
	
	this.board = new Array;
	for(var x = 0; x <= this.size; x++) {
		this.board[x] = []; 
		for(var y = 0; y <= this.size; y++) {
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
	for(var x = 0; x <= this.size; x++) {
		for(var y = 0; y <= this.size; y++) {
			this.board[x][y] = null;
		}
	}
};

T3.Model.prototype.move = function(x,y) {
	x = Math.floor(x / 100);
	y = Math.floor(y / 100);
	if(!(this.board[x][y])) {
		this.board[x][y] = this.currentPlayer.name;
		if(this.currentPlayer.name === 'X') {
		this.currentPlayer = this.players[1];
		}
		else {
			this.currentPlayer = this.players[0];
		}
	}
};

T3.Model.prototype.getWinner = function() {
	var winner = null;
	var px = 1;
	var py = 1;

	//check for a winner in the columns:
	for(var x = 0; x < this.size; x++) {
		if(this.board[x][py]) {
			if(this.board[x][py] === this.board[x][py-1] && this.board[x][py] === this.board[x][py+1]) {
				winner = this.board[x][py];
			}
		}
	}

	//check for a winner in the rows:
	for(var y = 0; y < this.size; y++) {
		if(this.board[px][y]) {
			if(this.board[px][y] === this.board[px-1][y] && this.board[px][y] === this.board[px+1][y]) {
				winner = this.board[px][y];
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