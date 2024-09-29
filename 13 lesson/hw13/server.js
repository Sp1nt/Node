var express = require('express');
var mssql = require('mssql');
var bodyParser = require('body-parser');

var app = express();
var port = 8080;


var config = {
    user: 'admin',
    password: 'admin',
    server: 'MAINDANYA\\SQLEXPRESS',
    database: 'Library',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
};

app.use(bodyParser.urlencoded({ extended: true }));

var connection = new mssql.ConnectionPool(config);


app.get('/manage-faculty', function (req, res) {
	res.sendFile(__dirname + '/faculties.html');
});

app.get('/manage-group', function (req, res) {
	res.sendFile(__dirname + '/groups.html');
});

app.get('/manage-student', function (req, res) {
	res.sendFile(__dirname + '/students.html');
});


app.post('/add-faculty', function (req, res) {
	var facultyName = req.body.facultyName;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var query = `INSERT INTO Faculties (Name) VALUES (@facultyName);`;

			request.input('facultyName', mssql.VarChar, facultyName);

			request.query(query, function (err, data) {
				if (err) {
					console.log('Insert error:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else {
					transaction.commit(function () {
						res.send('Faculty added successfully');
					});
				}
			});
		});
	});
});

app.post('/edit-faculty', function (req, res) {
	var facultyId = req.body.facultyId;
	var newFacultyName = req.body.newFacultyName;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var query = `UPDATE Faculties SET Name = @newFacultyName WHERE Id = @facultyId;`;

			request.input('facultyId', mssql.Int, facultyId);
			request.input('newFacultyName', mssql.VarChar, newFacultyName);

			request.query(query, function (err, data) {
				if (err) {
					console.log('Update error:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else {
					transaction.commit(function () {
						res.send('Faculty updated successfully');
					});
				}
			});
		});
	});
});

app.post('/delete-faculty', function (req, res) {
	var facultyId = req.body.facultyId;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var query = `DELETE FROM Faculties WHERE Id = @facultyId;`;

			request.input('facultyId', mssql.Int, facultyId);

			request.query(query, function (err, data) {
				if (err) {
					console.log('Delete error:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else {
					transaction.commit(function () {
						res.send('Faculty deleted successfully');
					});
				}
			});
		});
	});
});

app.post('/add-group', function (req, res) {
	var facultyName = req.body.facultyName;
	var groupName = req.body.GroupName;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var getFacultyIdQuery = `SELECT Id FROM Faculties WHERE Name = @facultyName;`;

			request.input('facultyName', mssql.VarChar, facultyName);

			request.query(getFacultyIdQuery, function (err, result) {
				if (err) {
					console.log('Error fetching faculty ID:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else if (result.recordset.length === 0) {
					transaction.rollback(function () {
						res.status(404).send('Faculty not found');
					});
				} else {
					var facultyId = result.recordset[0].Id;
					var insertGroupQuery = `INSERT INTO Groups (Name, Id_Faculty) VALUES (@groupName, @facultyId);`;

					request.input('groupName', mssql.VarChar, groupName);
					request.input('facultyId', mssql.Int, facultyId);

					request.query(insertGroupQuery, function (err, data) {
						if (err) {
							console.log('Insert error:', err);
							transaction.rollback(function () {
								res.status(500).send('Transaction failed, rollback successful');
							});
						} else {
							transaction.commit(function () {
								res.send('Group added successfully');
							});
						}
					});
				}
			});
		});
	});
});

app.post('/edit-group', function (req, res) {
	var groupId = req.body.groupId;
	var newGroupName = req.body.newGroupName;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var query = `UPDATE Groups SET Name = @newGroupName WHERE Id = @groupId;`;

			request.input('groupId', mssql.Int, groupId);
			request.input('newGroupName', mssql.VarChar, newGroupName);

			request.query(query, function (err, data) {
				if (err) {
					console.log('Update error:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else {
					transaction.commit(function () {
						res.send('Group updated successfully');
					});
				}
			});
		});
	});
});

app.post('/delete-group', function (req, res) {
	var groupId = req.body.groupId;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var query = `DELETE FROM Groups WHERE Id = @groupId;`;

			request.input('groupId', mssql.Int, groupId);

			request.query(query, function (err, data) {
				if (err) {
					console.log('Delete error:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else {
					transaction.commit(function () {
						res.send('Group deleted successfully');
					});
				}
			});
		});
	});
});

app.post('/add-student', function (req, res) {
	var studentFirstName = req.body.StudentFirstName;
	var studentLastName = req.body.StudentLastName;
	var groupName = req.body.GroupName;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var getGroupIdQuery = `SELECT Id FROM Groups WHERE Name = @groupName;`;

			request.input('groupName', mssql.VarChar, groupName);

			request.query(getGroupIdQuery, function (err, result) {
				if (err) {
					console.log('Error fetching group ID:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else if (result.recordset.length === 0) {
					transaction.rollback(function () {
						res.status(404).send('Group not found');
					});
				} else {
					var groupId = result.recordset[0].Id;
					var insertStudentQuery = `INSERT INTO Students (FirstName, LastName, Id_Group,Term) VALUES (@studentFirstName, @studentLastName, @groupId,2);`;

					request.input('studentFirstName', mssql.VarChar, studentFirstName);
					request.input('studentLastName', mssql.VarChar, studentLastName);
					request.input('groupId', mssql.Int, groupId);
					request.input('Term', mssql.Int, 2);

					request.query(insertStudentQuery, function (err, data) {
						if (err) {
							console.log('Insert error:', err);
							transaction.rollback(function () {
								res.status(500).send('Transaction failed, rollback successful');
							});
						} else {
							transaction.commit(function () {
								res.send('Student added successfully');
							});
						}
					});
				}
			});
		});
	});
});

app.post('/edit-student', function (req, res) {
	var studentId = req.body.studentId;
	var newStudentFirstName = req.body.newStudentFirstName;
	var newStudentLastName = req.body.newStudentLastName;
	var newGroupName = req.body.newGroupName;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);

			var getGroupIdQuery = `SELECT Id FROM Groups WHERE Name = @newGroupName;`;

			request.input('newGroupName', mssql.VarChar, newGroupName);

			request.query(getGroupIdQuery, function (err, result) {
				if (err) {
					console.log('Error fetching group ID:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else if (result.recordset.length === 0) {
					transaction.rollback(function () {
						res.status(404).send('Group not found');
					});
				} else {
					var groupId = result.recordset[0].Id;

					var updateStudentQuery = `
						UPDATE Students
						SET FirstName = @newStudentFirstName, LastName = @newStudentLastName, Id_Group = @groupId
						WHERE Id = @studentId;
					`;

					request.input('studentId', mssql.Int, studentId);
					request.input('newStudentFirstName', mssql.VarChar, newStudentFirstName);
					request.input('newStudentLastName', mssql.VarChar, newStudentLastName);
					request.input('groupId', mssql.Int, groupId);

					request.query(updateStudentQuery, function (err, data) {
						if (err) {
							console.log('Update error:', err);
							transaction.rollback(function () {
								res.status(500).send('Transaction failed, rollback successful');
							});
						} else {
							transaction.commit(function () {
								res.send('Student updated successfully');
							});
						}
					});
				}
			});
		});
	});
});

app.post('/delete-student', function (req, res) {
	var studentId = req.body.studentId;

	connection.connect(function (err) {
		if (err) {
			console.log('Connection error:', err);
			res.status(500).send('Database connection failed');
			return;
		}
		var transaction = new mssql.Transaction(connection);
		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var query = `DELETE FROM Students WHERE Id = @studentId;`;

			request.input('studentId', mssql.Int, studentId);

			request.query(query, function (err, data) {
				if (err) {
					console.log('Delete error:', err);
					transaction.rollback(function () {
						res.status(500).send('Transaction failed, rollback successful');
					});
				} else {
					transaction.commit(function () {
						res.send('Student deleted successfully');
					});
				}
			});
		});
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});