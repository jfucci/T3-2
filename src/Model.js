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
	this.winner = null;
};

T3.Player = function(name) {
	this.name = name;
};

T3.Model.prototype.restart = function() {
	this.winner = null;
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
	for(var x = 0; x < this.size; x++) {
		if(board[x][py]) {
			if(board[x][py] === board[x][py-1] && board[x][py] === board[x][py+1]) {
				winner = board[x][py];
			}
		}
	}

	for(var y = 0; y < this.size; y++) {
		if(board[px][y]) {
			if(board[px][y] === board[px-1][y] && board[px][y] === board[px+1][y]) {
				winner = board[px][y];
			}
		}
	}

	if(board[1][1]) {
		if(board[1][1] === board[0][0] && board[1][1] === board[2][2]) {
			winner = board[1][1];
		}
		else if(board[1][1] === board[0][2] && board[1][1] === board[2][0]) {
			winner = board[1][1];
		}
	}

	return winner;
};