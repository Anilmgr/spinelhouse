const pool = require('./pool');

function Party_ledger() {};

Party_ledger.prototype = {
    create: function(body,callback)
    {
        var bind = [];

        for(prop in body){
            bind.push(body[prop]);
        }

        let sql = 'INSERT INTO party_ledgers(name,phone,address1,address2,city,state,country,postal_code,tax_id,document) VALUES (?,?,?,?,?,?,?,?,?,?)';

        pool.query(sql, bind, function(err, result)
        {
            if(err) throw err;
            callback(result.insertId);
        });
    },
    
    show : function(id=null, callback)
	{
		let sql = 'SELECT * FROM party_ledgers';
		pool.query(sql, id, (err, rows, feilds) => {
            if(err) throw err
               callback(rows);
        });
	}

};

module.exports = Party_ledger;