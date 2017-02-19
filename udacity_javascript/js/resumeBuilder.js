var bio = {
	"name" : "Craig Isesele",	
	"skills" : ["introversion ", "chivalry ", "Java "],
	"contacts" : [
	{
		"mobile" : "6139155344",
		"email" : "cmoisesele@live.com",
		"twitter" : "@cmoitweet",
		"github" : "g-i-arc",
		"instagram" : "@cmoigram",
		"blog" : "",
		"location" : "1725 Riverside Drive, Ottawa, ON"
	}
	],
	"image" : "images/cmoi.jpg"
}
bio.age = "22"
bio.quote = "life is a traffic jam"
bio["role"] = "Software Engineer"

var work = {
	"jobs":[
	{
		"employer" : "Christ Embassy Ottawa",
		"title" : "technician",
		"dates" : "September 2013 - present",
		"location" : "716 Industrial Avenue, Ottawa, ON",
		"description" : "setting up mics"
	},
	{
		"employer" : "internet multimedia",
		"title" : "intern",
		"dates" : "August 2014",
		"location" : "Internet Multimedia Office, Lagos, Nigeria",
		"description" : "reviewed apps"
	},
	{
		"employer" : "inner city mission",
		"title" : "intern",
		"dates" : "August 2013",
		"location" : "Inner City Mission, Lagos, Nigeria",
		"description" : "studied python"
	}
	]
}
var project = {
	"projects" : [
	{
		"title" : "Online resume",
		"dates" : "2015",
		"description" : " ",
		"images" : [
			"http://static.goal.com/3057800/3057822_heroa.jpg",
			"http://static.djbooth.net/pics-features/drake-1-listen-review.jpg"
		]
	}
	]
}
var education = {
	"schools": [
	{
		"name": "Carleton University",
		"location": "Ottawa, ON, Canada",
		"degree": "BA",
		"major": ["SEng"],
		"dates": 2013
	},
	{
		"name": "Global International College",
		"location": "Lekki, Lagos, Nigeria",
		"degree": "Lambton",
		"major": ["GEng"],
		"dates": 2012
	}
	]
}
//title, school, dates, url
var onlineClasses = {
	"classes": [
	{
		"title": "Intro to Javascript",
		"school": "Udacity",
		"dates": "",
		"url": "udacity.com"
	},
	{
		"title": "HTML",
		"school": "Codecademy",
		"dates": "",
		"url" : "Codecademy.com"
	}
	]

}

$("#mapDiv").append(googleMap)