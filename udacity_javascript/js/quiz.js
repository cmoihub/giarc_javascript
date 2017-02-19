//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
//https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML

var sampleArray = [0,0,7];
var s = "cAmEROn PittMAN";

var name = "AlbERt EINstEiN";

var charEscape = function(_html) {
    var newHTML = _html;
    //newHTML = _html.replace(/</g, "&lt;");
    //newHTML = newHTML.replace(/>/g, "&gt;");
    newHTML = _html.replace(/</i,'')
    newHTML = _html.replace(/>/i,'')
    return newHTML;
};

function nameChanger(oldName) {
    var finalName = oldName;
    /*
    // Your code goes here!
    finalName = finalName.split(" ")
	firstName = finalName[0]
	firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
	
	finalName = firstName + " " + finalName[1].toUpperCase()
    */
    //
    names = oldName.split(" ")
    names[1] = names[1].toUpperCase()
    names[0] = names[0].slice(0,1).toUpperCase() + names[0].slice(1).toLowerCase()
    finalName = names.join(" ")
    // Don't delete this line!
    return finalName;
};

// Did your code work? The line below will tell you!
console.log(nameChanger(name));

var udacityizer = function(s) {  
	/*
	My code passed
	s = s.slice(1)
	var firstLetter  = s.charAt(0)
	firstUpperLetter  = firstLetter.toUpperCase()
	s = s.replace(firstLetter, firstUpperLetter)
	*/
	//s = s[1].toUpperCase() + s.slice(2);
    return s;
};

var  incrementLastArrayElement =  function (_array){
	/*
	Passed!
	for(var i = 0; i <_array.length ;i++){
        if(i != _array.length-1) newArray[i] = _array[i]
        else {
            newArray [i] = _array[i] + 1;
        }
    }
	*/
	/*
	function incrementLastArrayElement(_array)  {
    var newArray = [];
    newArray = _array.slice(0);
    var lastNumber = newArray.pop();
    newArray.push(lastNumber + 1);
    return newArray;
	*/
	return sampleArray;
}

var weirdObject = {
    "property": "Time for an astronomy lesson!",
    "property1": "Cameron's minor in college was astronomy",
    "property-2": "The 4 Galilean largest moons of Jupiter are:",
    "property 3": "Io, Ganymede, Callisto, Europa",
    "property$": "Saturn's moon Enceladus has liquid water ocean under its icy surface",
    " property": "The Sun contains 99.87% of the mass of the entire solar system",
    "property()": "There are 5 dwarf planets in our solar system:",
    "property[]": "Pluto, Ceres, Eris, Haumea, Makemake",
    "8property": "Mars has two tiny moons: Phobos and Deimos"
};

// Did your code work? The line below will tell you!
console.log(weirdObject.property);
console.log(weirdObject["property"]);