var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var middleware = require("./controllers/middleware.js");
var mainCtrl = require("./controllers/mainCtrl.js");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(middleware.addHeaders);

app.get("/name", mainCtrl.getName);
app.get("/location", mainCtrl.getLocation);
app.get("/occupations", mainCtrl.getOccupation);
app.get("/occupations/latest", mainCtrl.getLatest);
app.get("/occupations/:order", mainCtrl.getOccupationOrder);
app.get("/hobbies", mainCtrl.getHobbies);
app.get("/hobbies/:type", mainCtrl.getHobbyType);
app.get("/skillz", mainCtrl.getSkillz);

app.post("/name", mainCtrl.postName);
app.post("/location", mainCtrl.postLocation);
app.post("/occupations", mainCtrl.postOccupation);
app.post("/hobbies", mainCtrl.postHobbies);
app.post("/skillz", middleware.generateId, mainCtrl.postSkillz);

app.listen(8000, function(){
	console.log("listening on port 8000");
});