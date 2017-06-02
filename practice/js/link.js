let example_urls = [
            "https://m.facebook.com/Plantronics", 
            "https://www.youtube.com/user/PlantronicsTV", 
            "https://itunes.apple.com/ca/app/plantronics-hub/id464172515?mt=8", 
            "https://en.wikipedia.org/wiki/Plantronics", "https://twitter.com/plantronics", 
            "https://www.instagram.com/plantronics/?hl=en", 
            "https://www.facebook.com/BackBeatRun/"
            ];

/*
    Given an array of urls check if they contain a keyword or not
    Possibly a company may have multiple urls with the same keyword
    It adds urls that pass ie contain keywords to the array it returns
*/
//default/expected types of social medias
const keywords = ["facebook", "twitter", "instagram", "youtube"];
let social_media_links = [];

function checkURL(urls){
        urls.forEach(function(url){
        keywords.forEach(function(keyword){
            if(~url.indexOf(keyword)){
                social_media_links.push(url);
            }
        });
    });    
}

checkURL(example_urls);


console.log(social_media_links);