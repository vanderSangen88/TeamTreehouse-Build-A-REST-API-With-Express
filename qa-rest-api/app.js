'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);
var logger = require("morgan");

app.use(logger("dev"));
app.use(bodyParser.xml());

app.use("/questions", routes);

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Express server is listening on port", port);
});  