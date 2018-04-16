//NOTE: MUST BE RUNNING ON NODE 0.12.x

var express = require('express')
var session = require('express-session');
var app = express()

app.use(session({secret: 'ssshhhhh'}));

app.get('/guess', function(req, res) {
	if (req.query.check == req.session.answer) {
		res.send('flag{weak_prng_is_we4k}');
	} else {
		res.send('Lol u not very good at guessing');
	}
});

app.get('/', function(req, res) {
	var nums = [Math.random(), Math.random(), Math.random()];
	req.session.answer = Math.random().toFixed(6);
	res.setHeader('x-node-version', process.version);
        res.send(' Welcome to the lottery, all you need to do is guess the next number <b>rounded to 6 decimal places (i.e. 0.123456)</b>! When you think you know send your answer to "/guess?check=<number>".<br/><br/>Your lucky numbers are: ' + nums.join(', '))
});

app.listen(9001)
