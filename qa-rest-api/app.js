'use strict';

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);

var xmlCheck = function(req, res, next){
	if(req.body){
		console.log("The sky is", req.body.color);
	} else {
		console.log("There is no body property on the request");
	}
	next();
}

app.use(xmlCheck);
app.use(bodyParser.xml());
app.use(xmlCheck);

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Express server is listening on port", port);
});  