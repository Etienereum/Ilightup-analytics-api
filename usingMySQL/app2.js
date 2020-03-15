var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config.js');
var path = require('path');
var unirest = require("unirest");

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '600.Apples',
	database : 'ilightupDB'
});
  
connection.connect(function(err) {
  if (err) throw err;
  console.log("DB is now Connected!");
});

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/users.html'));
});

app.post('/signup', function(req, res) {
	var firstname = req.body.firstname;
	var password = req.body.password;
	
	if (firstname && password) {
		var passwdHash = bcrypt.hashSync(req.body.password, 8);
				
		// Creating a new user
		connection.query('INSERT INTO MyGuests SET firstname = ?, password =?', [firstname, passwdHash], function(error, results, fields) {
			if (error) throw error;
		});
	
		// create a token
		var token = jwt.sign(firstname, config.secret);
		
		// saving the token to the cesponsing firstname in the DB
		connection.query('UPDATE MyGuests SET apikey = ? WHERE firstname = ?', [token, firstname], function(error, results, fields) {
			if ( !token ) {
				res.send('No Token generated');
			} else {
				res.status(200).send( { auth: true, token: token } );
			}			
		});
		}
		else {
			res.send('Please enter the correct details!');
		}
});

// To get a single user data
app.get('/data', function(req, res, next) {
	var token = req.headers['x-access-token'];

	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	
	jwt.verify(token, config.secret, function(err, decoded) {
	  if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
	  
	  res.status(200).send(decoded);
	});

    next();
},  function (req, res) {
	
	// fetch some data for a single user
	var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

	req.query({
		"lon": "0",
		"callback": "test",
		"id": "2172797",
		"units": "%22metric%22 or %22imperial%22",
		"mode": "xml%2C html",
		"q": "London%2Cuk"
	});

	req.headers({
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "SIGN-UP-FOR-KEY"
	});

	req.end(function (res) {
		if (res.error) throw new Error(res.error);

		console.log(res.body);
	});
});

app.listen(3000);




	// connection.query('SELECT * FROM NiceBook', function (error, results, fields) {
	//    if (error) throw error;
	//  });