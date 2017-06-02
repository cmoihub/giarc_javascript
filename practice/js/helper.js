//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
//https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML
var text = "The reason I'm odd is 'cause I'm number one"
var loaded = $.getJSON('RandomTextFile.txt')
/*
function counter (){

}*/

function textLoader(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}