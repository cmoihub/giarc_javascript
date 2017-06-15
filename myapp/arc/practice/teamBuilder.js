
function hello(){
	$(document).ready(function() {
	    $("#demo").html("Hello, World!");
	});	
}
hello();

//add
$(document).ready(function(){
	$("#add").click(function(event){
		$.getJSON('/group', function(data){
			console.log(data);
			var newName = document.getElementById("nameToAdd").value;
			console.log(newName);
			//names is the array of names
			var names = Object.values(data);
			console.log(names);
			console.log('Hello')
			$.getJSON('/group/add/' + newName, success = function(data){
				console.log(data);
			})

		})
	})
})

//remove
// $(document).ready(function(){
// 	$("#remove").click(function(event){
// 		$.getJSON('/group', function(data){
// 			console.log(data);
// 			var nameToRemove = document.getElementById("nameToRemove").value;
// 		})
// 	})
// })

//display
function display(){
	$(document).ready(function(){
		$.getJSON('/group', function(data){
			var names = Object.values(data);
			$("#Group1").html("Group 1: " + names[0]);
			$("#Group2").html("Group 2: " + names[1]);
			$("#memberCount").html("each group has " + names[2]);
		})
	});
}

display();