const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({ extended:false}));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/reports', function(req, res) {
	res.sendFile(path.join(__dirname + '/reports.html'));
});


app.post('/reports-results', function (req, res) {

const sql= require("mssql");

const config = {
	user: 'bsnc',
	password: 'W3passwd',
	server: 'localhost',
	database: '489_BAMS',
	port: 1433
};


sql.connect(config, function (err) {
	if (err) console.log(err);

	let sqlRequest =  new sql.Request();

	let sqlQuery = 'Select * from Art' ;
	sqlRequest.query(sqlQuery, function (err,data) {
		if (err) console.log(err)
			console.log(data);
			console.table(data.recordset);
			console.log(data.rowsAffected);
			console.log(data.recordset[0]);
		
		
			let h='<h1 style="background:red;color:whitesmoke;margin:20px; border:20px solid red;">Art Info<h1>'
			let str='<table style="margin-left:20px;">';
			let row='';
			for (let j=0; j<data.recordset.length;j++){
				row=row + '<tr>' + '<td style="width:100px;">' + data.recordset[j].ArtID + '</td>' + '<td style="width:100px;">' + data.recordset[j].ArtistID + '</td>' + '<td style="width:100px;">' + data.recordset[j].LocationID + '</td>' + '<td style="width:100px;">' + data.recordset[j].Title + '</td>' + '<td style="width:100px;">' + data.recordset[j].Type + '</td>' + '<td style="width:100px;">' + data.recordset[j].Description + '</td>' + '<td style="width:100px;">' + data.recordset[j].Collection + '</td>' + '<td style="width:100px;">' + data.recordset[j].Status + '</td>' + '<td style="width:100px;">' + data.recordset[j].Purchase_Price + '</td>' + '<td style="width:100px;">' + data.recordset[j].Value + '</td>' + '<td style="width:100px;">' + data.recordset[j].Aquireddt + '</td>' + '<td style="width:100px;">' + data.recordset[j].Avaliable + '</td>' + '<td style="width:100px;">' + data.recordset[j].Media + '</td>' + '<td style="width:100px;">' + data.recordset[j].Primary_Artist + '</td>' + '<td style="width:100px;">' + data.recordset[j].PurchaseID + '</td>'
			}
			str=str+row+ '</table>';
			res.send(h+str); 
		sql.close();
	});
});
});
const server =app.listen(5000, function(){
	console.log('Running...');
})