var counter = 0;
var timeLeft = 5;
var maxSeconds = 60;
function convertSeconds(time){
	var minutes = floor(time/maxSeconds);
	var seconds = time % 60;
	return nf(minutes,2) + ':' + nf(seconds,2);
}

function setup() {
	//Select timer id from the html file
	var timer = select('#timer');
	timer.html(convertSeconds(timeLeft * maxSeconds - counter));

	function timeIt(){
		counter++;
		timer.html(convertSeconds(timeLeft * maxSeconds - counter));
	}


	setInterval(timeIt, 1000);
}