/*global $:true, document:true, T3:true */

T3.Controller = function() {

	var model = new T3.Model();
    var view = new T3.View(model);

	$("#restart").click(function(){
     model.restart();
     view.update();
   }).click();
};

//this function is called once the page is done loading
$(document).ready(function() {
	new T3.Controller();
});