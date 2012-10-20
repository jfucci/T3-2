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
	this.model.move(pixelX,pixelY);
	this.update();
};

T3.View.prototype.update = function() {
	$('#status').text(this.model.currentPlayer.name + "'s move");
	this._draw();
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (board[x][y] === 'O') {
				this._drawCircle(x, y);
			}
			else if (board[x][y] === 'X'){
				this._drawCross(x, y);
			}
		}
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
	var size = this.model.size;
	var nudge = this.pixel / 2;
	for(var y = 1; y < size; y++) {
		var py = (y / size);
		this.ctx.moveTo(0, py + nudge);
		this.ctx.lineTo(1, py + nudge);
	}
};

T3.View.prototype._drawColumnLines = function() {
	var size = this.model.size;
	var nudge = this.pixel / 2; 
	for(var x = 1; x < size; x++) {
		var px = (x / size);
		this.ctx.moveTo(px + nudge, 0);
		this.ctx.lineTo(px + nudge, 1); 
	}
}

T3.View.prototype._stroke = function(pixelWeight, color) {
	this.ctx.strokeStyle = color;
	this.ctx.lineWidth = this.pixel * pixelWeight;
	this.ctx.stroke();
}

T3.View.prototype._drawCircle = function(x,y) {
	this.ctx.beginPath();
	var size = this.model.size;
	var px = (x / size) + 1/6;
	var py = (y / size) + 1/6;
	this.ctx.arc(px, py, 0.13, 0, 2*Math.PI);
	this._stroke(1 / 3, 'black');
	this.ctx.closePath();
}

T3.View.prototype._drawCross = function(x,y) {
	this.ctx.beginPath();
	var cellSize = 1 / this.model.size;
	var px = (x * cellSize);
	var py = (y * cellSize);
	this.ctx.moveTo(px, py);
	this.ctx.lineTo(px + cellSize, py + cellSize);
	this.ctx.moveTo(px, py + cellSize);
	this.ctx.lineTo(px + cellSize, py);

	this._stroke(1 / 3, 'black');
	this.ctx.closePath();
}