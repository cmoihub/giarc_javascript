function check(string){
	var str = str.toLowerCase();
	var a = str.split(' ').join('');
	var b = a.split('').reverse().join();
	return a === b;
}

var checked = check ("Do geese see God");