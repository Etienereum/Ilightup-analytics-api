


app.post('/signup', function(req, res) {
    // save email
    // save password
});

app.post('/login', function(req, res) {
    // email
    // password

    //authemtic user

    // generate and return session token
});

app.get('/records', function(req, res, next) {
    let token = req.query.key || null;

    if( ! token) {
        res.send();
    }

    // validate token 

    // if token not valid
    //return error response

    next();
}, function(req, res) {
    // fetch record and return to the user
});



app.post('/user', function(req, res) {
    // name 
    // email
    // Create a new user

    // generate random unique token

    // save user record including token
});

app.get('/sales', function(req, res, next) {
    let token = req.query.key || null;

    if( ! token) {
        res.send();
    }



    // validate token 

    // fetch record using the key....

    // 

    

    next();
}, function(req, res) {

    // Fetch list of sales

    // fetch record and return to the user
});
