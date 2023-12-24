var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'join_us'   // the name of your db
});

app.get("/", function(req, res){
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results){
		if(err) throw err;
		var count = results[0].count;
		//res.send("Tenemos "+count+ " usuarios registrados");
		res.render("home", {data: count});
	})
});

app.post("/register", function(req, res){
	var person = {
		email: req.body.email
	};
	
	connection.query('INSERT INTO users SET ?', person, function(err, result){
		if(err) throw err;
		console.log(result);
		res.redirect("/");
	});
	
});



app.get("/joke", function(req, res){
	res.send("I do not know how to tell jokes");
});

app.get("/random_number", function(req, res){
	var num = Math.floor(Math.random() * 100);
	res.send("You're number is "+num);
});

app.listen(3000, function(){
	console.log("Server running on 3000");
});