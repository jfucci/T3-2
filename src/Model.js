/*global _:true, T3:true */

T3.Model = function() {
	this.size = 3;
	this.players = [new T3.Player('X'), new T3.Player('O')];
	this.currentPlayer = this.players[0];
};

T3.Player = function(name) {
	this.name = name;
};