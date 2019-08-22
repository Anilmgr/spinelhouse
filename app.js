const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');
const app = express();

// for body parser
app.use(express.urlencoded({ extended : false}));

// static server file
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'lib')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// session
app.use(session({
	secret: 'spinelhouse',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 1000 * 30
	}
}));

app.use('/', pageRouter);

// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(res.render('404'));
});                      

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});


// setting up server
app.listen(3000, () => {
	console.log('Server started');
});

module.exports = app;