/*global $:true, document:true, T3:true */

T3.Controller = function() {

	var model = new T3.Model();
	//make the user choose tic tac toe or connect four, and setup Model accordingly:
	var mode = {};
	while(mode !== '1' && mode !== '2') {
		mode = prompt("Tic Tac Toe (1) or Connect Four (2)?");
	}
	if(mode === '1') {
		model.setupTicTacToe();
	} else {
		model.setupConnect4();
	}

	var view = new T3.View(model);

	$("#restart").click(function() {
		model.restart();
		view.update();
	}).click();

	$("#canvas").mousemove(function(event){
		view.update();
		var pixelX = event.pageX - view.canvas.offset().left;
		var pixelY = event.pageY - view.canvas.offset().top;
		var cellWidthInPixels = view.canvas.width() / model.xCells;
		var cellHeightInPixels = view.canvas.height() / model.yCells;

		var x = Math.floor(pixelX / cellWidthInPixels); //find the x index of the cell
		var y = Math.floor(pixelY / cellHeightInPixels); //find the y index of the cell

		//this outer if statement is necessary to get rid of an uncaught type error that 
		//occured when moving the mouse off of the right side of the canvas
		if(x < model.xCells) {
			if(model.currentPlayer.name === 'X' && !(model.board[x][y])) {
				view._drawCross(x, y, '#C3C3C3');
			} else if(model.currentPlayer.name === 'O' && !(model.board[x][y])) {
				view._drawCircle(x, y, '#C3C3C3');
			}
		}
    });
};

//this function is called once the page is done loading
$(document).ready(function() {
	new T3.Controller();
});