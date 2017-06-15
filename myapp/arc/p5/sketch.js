function setup() {
	createCanvas(500, 700);
	drawData();
	var button = select('#submit');
	button.mousePressed(submitWord = function(){
		var word = select('#word').value();
		var score = select('#score').value();
		console.log(word, score);
		loadJSON('add/' + word + '/' + score, finished = function(data){
			console.log(data);
			drawData();
		});
	})
}

function drawData(){
	loadJSON('/all', gotData = function (data){
		background(30);
		var keys = Object.keys(data);
		console.log(keys);
		for (var i = 0; i < keys.length; i++){
			var word = keys[i],
				score = data[word],
				x = random (width),
				y = random (height);
			fill(255);
			textSize(64);
			text(word, x, y);
		}
	});
}

// function draw() {
// 	ellipse (50, 50, 80, 80);
// }