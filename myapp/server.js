//req - request, res - response

var express = require ('express'),
	fs = require('fs'),
	app = express(),
	port = 3000,
	server = app.listen(port, (err) => {  
	  if (err) {
	    return console.log('something bad happened', err);
	  }
	  console.log(`server is listening on ${port}`);
	});

var word_data = fs.readFileSync('words.json'),
	words = JSON.parse(word_data);

var	group_data = fs.readFileSync('group.json'),
	name_data = JSON.parse(group_data);
	names = name_data.members;

app.use(express.static(__dirname + '/arc'));
app.use(express.static(__dirname + '/arc/p5'));
app.use(express.static(__dirname + '/arc/practice'));



app.get('/practice',function(req,res){
  res.sendFile('/practice/index.html');
});

app.get('/',function(req,res){
  res.sendFile('/p5/index.html');
});

app.get('/time',function(req,res){
  res.sendFile('/timer.html');
});

//localhost:3000/search/hello/4 will output hello 4 times in a row
//
///* Word Manipulation Section *///
app.get('/search/:flower/:num', sendFlowers = function(req, res){
	var data = req.params;
	var num = data.num;
	var reply = "";
	for (var i = 0; i < num; i++){
		reply += "How are you doing " + data.flower + "?\n";
	}
	res.send(reply + reply);
});

// app.get('/temp', temp = function(req, res){
// 	var reply = temp_names.names;
// 	res.send(reply);
// })

app.get('/search/:word/', searchWord = function(req, res){
	var word = req.params.word;
	var reply;
	if(words[word]){
		reply = {
			status: "found",
			word: word,
			score: words[word]
		}	
	}else{
		reply = {
			status: "not found",
			word: word,
		}
	}
	res.send(reply);
});

app.get('/add/:word/:score?', addWord = function(req, res){
	var word = req.params.word;
	var score = Number(req.params.score);
	var reply;
	if(!score){
		reply = {
			msg: "Score is required"
		}	
	}else{
		words[word] = score;
		var word_data = JSON.stringify(words);
		fs.writeFile('words.json', word_data, finished = function(err){
			console.log('all set');
		});
		reply = {
			msg: "Thanks for your word"
		}
	}
	res.send(reply);
});

app.get('/all',sendAll = function(req, res){
	res.send(words)
});

var	group1 = [],
	string1 = "",
	group2 = [],
	string2 = "",
	emptyString = "";
var times = round(names.length/2,2);
//https://stackoverflow.com/questions/12025820/how-to-send-array-of-ids-correctly-in-express
app.get('/group', sendGroup = function(req, res){
	for (var i = 0; i < names.length; i++){
		names[i] = names[i].toLowerCase();
	}
	for (var i = 0; i < times; i++){
		string1 += selectRandomItem(names, group1);
		string2 += selectRandomItem(names, group2);
		emptyString += "-";
	}
	var reply = {
		Group1: group1,
		Group2: group2,
		msg: times + " members"
	}
	res.send(reply);
});

app.get('/group/add/:person?', addPerson = function(req, res){
	var person = String(req.params.person),
		reply;

	if(!person){
		reply = "You didn't add anyone?!"
	} else {
		person = person.toLowerCase();
		if(names.includes(person)){
			reply = person + "is already in the array, if you still" + 
			" want to add" + person + "include their initials or something"
		} else {
			name_data.members.push(person);
			var group_data = JSON.stringify(name_data);
			fs.writeFile('group.json', group_data, success = function(err){
				console.log("Done!");
			});
			reply = person + " added"
		}
	}
	res.send(reply);
});

app.get('/group/remove/:person', removePerson = function(req, res){
	var person = String(req.params.person),
		reply;
	if(removeItem(person, names)){
		reply = person + "removed";
	} else {
		reply = "Item does not exist in the array"
	}
	
	res.send(reply);
});

/**
 * Represents a number using exponential notation
 * Used here to round up a number
 * @param  {Number} value    Value being rounded up
 * @param  {Number} decimals Expected number of decimals
 * @return {Number}          Rounded up value
 */
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/**
 * This method gets a random item from an array and places it in another array
 * @param  {Array} items    the array the random item is being gotten from
 * @param  {Array} subItems the array into which the selected item goes into
 * @return {String}          Returns the selected item as a string
 */
function selectRandomItem (items, subItems){
	if(items.length !== 0){
		var temp = "";
		item = items[Math.floor(Math.random()*items.length)]; 
		subItems.push(item);
		removeItem(item, items);
		temp += item + ", ";
		return temp;	
	}
	else return "";
}

/**
	 * removes an item from an array
	 * @param  {String} item  item to remove
	 * @param  {Array} items array item is being removed from
	 * @return
	 */
function removeItem(item, items){
	var index = items.indexOf(item);
	if(index > -1){
		items.splice(index,1);
		return true;
	}
	return false;
}

// 260
