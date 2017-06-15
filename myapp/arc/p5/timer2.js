//var counter = 0;
var timeLeft = 10;
var maxSeconds = 60;
var currentTime = 0;
var startTime = 0;
var millisecond = 1000;
function convertSeconds(time){
	var minutes = floor(time/maxSeconds);
	var seconds = time % 60;
	return nf(minutes,2) + ':' + nf(seconds,2);
}

var ding = function(){
	loadSound("Kalimba.mp3")
};

var Kalimba;
function preLoad(){
	Kalimba = loadSound("Kalimba.mp3");
}

function setup() {
	startTime = millis();

	//Kalimba.play();
	noCanvas();
	//check url value
	//Try this http://localhost:8000/Programming/arc_js/p5/?minute=60
	var params = getURLParams();
	//convert minutes to seconds
	if(params.minute){
		var min = params.minute;
		timeLeft = min*maxSeconds;
	}
	else{
		timeLeft = timeLeft * maxSeconds;
	}

	var interval = setInterval(timeIt, millisecond);
	//Select timer id from the html file
	var timer = select('#timer');
	timer.html(convertSeconds(timeLeft - currentTime));

	function timeIt(){
		//currentTime++;
		currentTime = floor((millis() - startTime)/millisecond);
		timer.html(convertSeconds(timeLeft - currentTime));
		//timer is done
		if(currentTime == timeLeft){
			//Kalimba.play();
			//restart
			//currentTime = 0;
			//Stop timer
			clearInterval(interval);
		}
	}

}

function draw(){
	console.log("hello");
}