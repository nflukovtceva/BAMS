const express = require('express');
const path = require('path');
const app = express();
var Reports = require('./reports');
var Add = require('./add-form')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/reports', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/reports.html'));
});

app.use('/add-form', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/add-form.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
