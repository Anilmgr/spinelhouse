const express = require('express');
const path = require('path');

const app = express();

// for body parser
app.use(express.urlencoded({ extended : false}));

// static server file
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'lib')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
	res.render('login');
});

app.get('/register', function(req, res){
	res.render('register');
});


// setting up server
app.listen(3000, () => {
	console.log('Server started');
});

module.exports = app;