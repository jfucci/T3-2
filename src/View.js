/*global _:true, T3:true, $:true */

T3.View = function(model) {
	this.model = model;
	this.canvas = $("#canvas");
	this.ctx = this.canvas[0].getContext("2d");

	var width = this.canvas.width();
	var height = this.canvas.height();

	this.ctx.scale(width, height);
	this.pixel = 1 / width;

	this.canvas.click(_.bind(this._mouseClick, this));

};

T3.View.prototype._mouseClick = function(event) {
	var pixelX = event.pageX - this.canvas.offset().left;
	var pixelY = event.pageY - this.canvas.offset().top;
	if(!(this.model.getWinner())) {
		var widthInPixels = this.canvas.width();
		var heightInPixels = this.canvas.height();
		var cellWidthInPixels = widthInPixels / this.model.xCells;
		var cellHeightInPixels = heightInPixels / this.model.yCells;

		var x = Math.floor(pixelX / cellWidthInPixels); //find the x index of the cell
		var y = Math.floor(pixelY / cellHeightInPixels); //find the y index of the cell
		this.model.move(x, y);
		this.update();
	}
};

T3.View.prototype.update = function() {
	var takenCells = 0;
	this._draw();

	//draw the X's and O's on the board according to the board array:
	for(var x = 0; x < this.model.xCells; x++) {
		for(var y = 0; y < this.model.yCells; y++) {
			if(this.model.board[x][y] === 'O') {
				this._drawCircle(x, y);
				takenCells++;
			} else if(this.model.board[x][y] === 'X') {
				this._drawCross(x, y);
				takenCells++;
			}
		}
	}

	//update the status and ask the user if they would like to play again if there is a winner:
	if(takenCells === this.model.xCells * this.model.yCells && !(this.model.getWinner())) {
		$('#status').text('Stalemate!');
		if(confirm('Stalemate!\nWould you like to play again?')) {
			this.model.restart();
			this.update();
		}
	} else if(this.model.getWinner()) {
		$('#status').text(this.model.getWinner() + ' is the winner');
		if(confirm(this.model.getWinner() + ' is the winner\nWould you like to play again?')) {
			this.model.restart();
			this.update();
		}
	} else {
		$('#status').text(this.model.currentPlayer.name + "'s move");
	}
};

T3.View.prototype._draw = function() {
	this.ctx.save();
	this.ctx.clearRect(0, 0, 1, 1);

	this._drawBoard();

	this.ctx.restore();
};

T3.View.prototype._drawBoard = function() {
	this.ctx.beginPath();
	this._drawRowLines();
	this._drawColumnLines();
	this._stroke(1 / 3, 'black');
};

T3.View.prototype._drawRowLines = function() {
	var nudge = this.pixel / 2;
	for(var y = 1; y < this.model.yCells; y++) {
		var py = (y / this.model.yCells);
		this.ctx.moveTo(0, py + nudge);
		this.ctx.lineTo(1, py + nudge);
	}
};

T3.View.prototype._drawColumnLines = function() {
	var nudge = this.pixel / 2;
	for(var x = 1; x < this.model.xCells; x++) {
		var px = (x / this.model.xCells);
		this.ctx.moveTo(px + nudge, 0);
		this.ctx.lineTo(px + nudge, 1);
	}
};

T3.View.prototype._stroke = function(pixelWeight, color) {
	this.ctx.strokeStyle = color;
	this.ctx.lineWidth = this.pixel * pixelWeight;
	this.ctx.stroke();
};

T3.View.prototype._drawCircle = function(x, y) {
	this.ctx.beginPath();

	var cellWidth = 1 / this.model.xCells;
	x = (x / this.model.xCells) + cellWidth / 2; //change x to be the x coordinate of the middle of the cell
	y = (y / this.model.yCells) + cellWidth / 2; //change y to be the y coordinate of the middle of the cell
	var radius = (cellWidth / 2) - (cellWidth / 8); //the diameter will be 3/4 the cell width
	this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
	this._stroke(1 / 3, 'black');

	this.ctx.closePath();
};

T3.View.prototype._drawCross = function(x, y) {
	var cellWidth = 1 / this.model.xCells;

	//necessary so the 'X' does not go all the way to the corners of the cell:
	var adjustment = cellWidth - (cellWidth / 8); //the width and height of every 'X' will be 3/4 
	//the cell width, same as the diameter of every 'O'
	var cellWidthAdjusted = cellWidth - 2 * adjustment;

	x = (x * cellWidth) + adjustment; //change x to the x coordinate of the top left corner of the cell
	y = (y * cellWidth) + adjustment; //change y to the y coordinate of the top left corner of the cell
	this.ctx.beginPath();
	this.ctx.moveTo(x, y);
	this.ctx.lineTo(x + cellWidthAdjusted, y + cellWidthAdjusted);
	this.ctx.moveTo(x, y + cellWidthAdjusted);
	this.ctx.lineTo(x + cellWidthAdjusted, y);
	this._stroke(1 / 3, 'black');
	this.ctx.closePath();
};