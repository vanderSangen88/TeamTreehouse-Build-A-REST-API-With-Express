'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var bodyParser = require("body-parser");
require('body-parser-xml')(bodyParser);
var logger = require("morgan");

app.use(logger("dev"));
app.use(bodyParser.xml());

// Start Setup Mongoose
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/qa");

var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection succesful");
});
// End of Mongoose

/* 4.3 Next Steps:
	Setup once to allow access from any domain within a browser
*/
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.methond === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
		return res.status(200).json({});
	}
	next();
});

app.use("/questions", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error handler
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});


var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Express server is listening on port", port);
});  