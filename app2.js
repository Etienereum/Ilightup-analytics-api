var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '600.Apples',
	database : 'ilightupdb'
});
  
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
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

var firstname, email, token;

app.post('/signup', function(req, res) {
	firstname = req.body.firstname;
	email = req.body.email;
	if (firstname && email) {
			
		// create a token
		token = jwt.sign(email, "asterix-needs-permit-a-38");
		res.status(200).send({ auth: true, token: token });

		// saving the token to the cesponsing firstname in the DB
		connection.query('UPDATE MyGuests SET apikey = ? WHERE email = ?', [token, email], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = firstname;
				resp.redirect('/home');
			} else {
				resp.send('Incorrect Input');
			}			
			resp.end();
		});
	} else {
		resp.send('Please enter firstname and email!');
		resp.end();
	}
});


app.post('/login', function(req, res, next) {
	token = req.query.key || null;

    if( !token) {
        res.send('Unauthorised person');
	}
	else {


	}


	
	
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

// app.get('/record', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

app.listen(3000);