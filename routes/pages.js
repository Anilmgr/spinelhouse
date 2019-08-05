const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();

router.get('/', function(req, res){
	let user = req.session.user;
		if(user) {
			res.redirect('/dashboard');
			return;
		}
		res.render('index');
	});

router.post('/login', function(req, res, next) {
	user.login(req.body.userid, req.body.password, function(result){
		if(result){

			req.session.user = result;
			req.session.opp = 1;

			res.redirect('/dashboard');	

		} else {
			res.render('index', {message: 'Incorrect Username/Password.'});
		}
	})
});

router.post('/register', function(req, res, next){
	let userInput = {
		userid: req.body.userid,
		fullname: req.body.fullname,
		email: req.body.email,
		password: req.body.password
	};

	user.create(userInput, function(lastId){
		if(lastId){
			user.find(lastId, function(result){
				req.session.opp = 0;	
				res.render('signup', {message: 'Successfully registered!!'});			}); }
		else {
			console.log('Error in creating user');
		}
	});
});

router.get('/signup', function(req, res){
	res.render('signup');
})

router.get('/dashboard', function(req, res, next){
	let user = req.session.user;

	if(user){
		res.render('dashboard', {opp:req.session.opp, name:user.fullname});
		return;
	}
	res.redirect('/');
	
});

// Get logout page
router.get('/logout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});


module.exports = router;