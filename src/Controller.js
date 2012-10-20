/*global $:true, document:true, T3:true */

T3.Controller = function() {
	model = new T3.Model();     //was var model
	view = new T3.View(model);  //was var view
	model.restart();
	view.update();
};

//this function is called once the page is done loading
$(document).ready(function() {
	new T3.Controller();
	$("a").click(function(event){
     model.restart();
     view.update();
   });
});