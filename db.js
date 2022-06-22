
var mysql = require('mysql')

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database : "ecommerce"
})

connection.connect(function(err) {
	if(err){
	console.log("Error in the connection") 
	}
	else{
	console.log(`Database Connected`);
	}
})
 module.exports = connection 