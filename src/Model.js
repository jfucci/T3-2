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
			y = this.cellWithGravityY(x, y);
		}
		this.board[x][y] = this.currentPlayer.name;
		this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
	}
};

T3.Model.prototype.cellWithGravityY = function(x, y) {
	for(y = this.yCells - 1; y >= 0; y--) {
		if(!(this.board[x][y])) {
			break;
		}
	}	
	return y;
};

//returns true if player is the winner if checkSquareWinner(x,y,player)
//returns true for any square. Otherwise it returns false.
T3.Model.prototype.checkWinner = function(player) {
	for(var x = 0; x < this.xCells; x++) {
		for(var y = 0; y < this.yCells; y++) {
			if(this.board[x][y] === player && this.checkSquareWinner(x, y, player)) {
				return true;
			}
		}
	}
	return false; //if checkWinner() exits the for loop, no squares have a line that entirely matches 'player'
};


//returns true if checkLineWinner(x,y,deltaX,deltaY,player) returns true
//for any of the 8 possible lines originating at x, y. Otherwise return false.
T3.Model.prototype.checkSquareWinner = function(x, y, player) {
	var winnerIndex = this.winnerSize - 1;

	for(var deltaX = -winnerIndex; deltaX <= winnerIndex; deltaX += winnerIndex) {
		for(var deltaY = -winnerIndex; deltaY <= winnerIndex; deltaY += winnerIndex) {
			if(deltaX !== 0 || deltaY !== 0) {
				if(this.checkLineWinner(x, y, deltaX, deltaY, player)) {
					return true;
				}
			}
		}
	}
	return false; //if checkSquareWinner exits the for loop, no line entirely matches 'player' for square x, y
};

//returns false if any squares along line starting at x,y and 
//heading in direction deltaX, deltaY are off board or not owned by player. Otherwise return true.
T3.Model.prototype.checkLineWinner = function(x, y, deltaX, deltaY, player) {
	var targetX = x + deltaX;
	var targetY = y + deltaY;

	if(targetX < 0 || targetY < 0 || targetX >= this.xCells || targetY >= this.yCells) {
		return false;
	} else {
		var isWinner = true;
		var moveX = 1;
		var moveY = 1;

		if(deltaX < 0) {
			moveX = -1;
		}
		if(deltaY < 0) {
			moveY = -1;
		}

		while(x !== targetX || y !== targetY) {
			if(x !== targetX) {
				x += moveX;
			}
			if(y !== targetY) {
				y += moveY;
			}
			if(this.board[x][y] !== player) {
				isWinner = false;
				break;
			}
		}
		return isWinner;
	}
};

//loops through the players array and returns the one (if any) that checkWinner returns true for
T3.Model.prototype.getWinner = function() {
	var winner = null;
	for(var iii = 0; iii < this.players.length; iii++) {
		if(this.checkWinner(this.players[iii].name)) {
			winner = this.players[iii].name;
			break;
		}
	}
	return winner;
};