/*global $:true, document:true, T3:true */

T3.Controller = function() {

	var model = new T3.Model();
	var view = new T3.View(model);

	$("#restart").click(function() {
		model.restart();
		view.update();
	}).click();

	$("#tictactoe").click(function() {
		model.setupTicTacToe();
		model.restart();
		view.update();
	}).click();

	$("#connect4").click(function() {
		model.setupConnect4();
		model.restart();
		view.update();
	});

	$("#canvas").mousemove(function(event) {
		view.update();
		var x = view.getCellXCoordinate(event);
		var y = view.getCellYCoordinate(event);
		if(model.gravity) {
			y = model.cellWithGravityY(x, y);
		}
		if(!(model.board[x][y]) && !(model.getWinner())) {
			if(model.currentPlayer.name === 'X') {
				view._drawCross(x, y, '#C3C3C3');
			} else if(model.currentPlayer.name === 'O') {
				view._drawCircle(x, y, '#C3C3C3');
			}
		}
	});

	$("#canvas").mouseleave(function() {
		view.update();
	});
};

//this function is called once the page is done loading
$(document).ready(function() {
	new T3.Controller();
});