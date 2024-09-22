var mssql = require('mssql');
var displayHandler = require('./displayhandler');  

var connection = require('./config'); 


function getAllItems (req, res) {
		
	var self = this; 		
	self.tableRows = ``; 

		var request = new mssql.Request(connection);  
		request.stream = true; 
		request.query("SELECT * FROM items"); 
		
		request.on('row', function(row){ 

			self.tableRows += ` 
			<tr>
				<td>${row.id} </td>
            	<td>${row.name} </td>
            	<td>${row.login}</td>
            	<td>${row.password}</td>
			</tr>` 
		}); 
		
		request.on('done', function(affected) { 
			console.log('show_items'); 
			res.render('admin', { data:  self.tableRows }); 
		})		

}

module.exports = {

    tableRows: ``,

    };