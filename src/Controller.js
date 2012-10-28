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
};

//this function is called once the page is done loading
$(document).ready(function() {
	new T3.Controller();
});