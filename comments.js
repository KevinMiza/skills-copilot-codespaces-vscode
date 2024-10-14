// Create web server 
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/api/comments', function(req, res) {
	fs.readFile(__dirname + '/comments.json', function(err, data) {
		if (err) {
			console.log('Error reading comments.json: ' + err);
			res.status(500).send('Error reading comments.json');
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		}
	});
});
app.post('/api/comments', function(req, res) {
	fs.readFile(__dirname + '/comments.json', function(err, data) {
		if (err) {
			console.log('Error reading comments.json: ' + err);
			res.status(500).send('Error reading comments.json');
		} else {
			var comments = JSON.parse(data);
			comments.push(req.body);
			fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 2), function(err) {
				if (err) {
					console.log('Error writing comments.json: ' + err);
					res.status(500).send('Error writing comments.json');
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify(comments, null, 2));
				}
			});
		}
	});
});
app.listen(3000, function() {
	console.log('Server listening on port 3000');
});
