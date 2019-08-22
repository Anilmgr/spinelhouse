const express = require('express');
const User = require('../core/user');
const Party_ledger = require('../core/party_ledger');
const router = express.Router();

const user = new User();
const party_ledger = new Party_ledger();

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

router.post('/register/user', function(req, res, next){
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
				res.render('register', {message: 'Successfully registered!!'});			}); }
		else {
			console.log('Error in creating user');
		}
	});
});

router.get('/register', function(req, res){
	res.render('register');
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

router.get('/purchases', function(req, res){
	res.render('purchases',{param: 'purchases'});
})

router.post('/purchases/add_party', (req, res, next) => {
	let userInput = {
		name: req.body.name,
		phone: req.body.phone,
		address1: req.body.address1,
		address2: req.body.address2,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		postal_code: req.body.postal_code,
		tax_id: req.body.tax_id,
		document: req.body.document
	};

	party_ledger.create(userInput, function(lastId){
		if(lastId){
			user.find(lastId, function(result){	
				res.render('purchases', {message: 'Successfully created!!'});			
			}); 
		}
		else {
			res.render('purchases', {message: 'Failed to create!!'});
		}
	});
});

router.get('/purchase_ledger', function(req, res){
	party_ledger.show(function(rows, fields){
		if(fields){
			res.render('purchase_ledger',{fields: fields,param: "purchase_ledger"});
		} 
	});
});

router.get('/purchasevoucher', function(req, res){
	res.render('purchasevoucher');
});

module.exports = router;