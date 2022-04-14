var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ravikiran',
  password : 'Ravi@2000',
  database : 'test'
});
 
connection.connect();
module.exports=connection;