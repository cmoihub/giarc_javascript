var counter = 0;
var timeLeft = 30;
var maxTime = 60;
function convertSeconds(time){
	var seconds = time % 60;
	var minutes = floor(time/maxTime);
	var hours = floor(minutes/maxTime);
	var minutes = minutes % 60;
	return nf(hours,2) + ':' + nf(minutes,2) + ':' + nf(seconds,2);
}

function setup() {
	//Kalimba.play();
	noCanvas();
	//check url value
	//Try this http://localhost:8000/Programming/arc_js/p5/?minute=60
	var params = getURLParams();
	//convert minutes to seconds
	if(params.minute){
		var min = params.minute;
		timeLeft = min*maxTime;
	}
	else{
		timeLeft = timeLeft * maxTime;
	}

	var interval = setInterval(timeIt, 1000);
	//Select timer id from the html file
	var timer = select('#timer');
	timer.html(convertSeconds(timeLeft - counter));

	function timeIt(){
		counter++;
		timer.html(convertSeconds(timeLeft - counter));
		//timer is done
		if(counter == timeLeft){
			//Kalimba.play();
			//restart
			counter = 0;
			//This option will cause the timer to stop running
			//clearInterval(interval);
		}
	}	
}

function draw(){
	console.log("hello");
}