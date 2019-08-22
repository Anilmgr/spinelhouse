const pool = require('./pool');

function Purchase() {};

Purchase.prototype= {
	create : function(body,callback){
		var bind = [];
		 for(prop in bind){
		 	bind.push(body[prop]);
		 }

		 let sql = 'INSERT INTO purchases(party_name, invoice_no, ref_no, purchase_date, purchase_invoice_img, stock_location, narration) VALUES (?,?,?,?,?,?,?)';

		 pool.query(sql,bind, function(err, result)
		 {
		 	if(err) throw err
		 		callback(result[0]);
		 });
	},
};

module.exports = Purchase;