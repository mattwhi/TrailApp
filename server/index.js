var express = require('express');

var app = express();

var jwt = require('express-jwt');

var cors = require('cors');

app.use(cors());

var authCheck = jwt({
    secret: new Buffer('h7ccPq2KTatRcvQXYVTuCukSu8QE8_cU9Jej-PeOvbLyznc0c2rI1ynKICKo3l-k', 'base64'),
    audience: 'UQJaGn8oumO1whyftBTBaumkq0mpxTbW'
});

app.get('/api/public', function(req, res) {
    res.json({message: 'hello from a public end point!'});
});
app.get('/api/private', authCheck, function(req, res) {
    res.json({message: 'hello from a private end point!'});
});

app.listen(4500);
console.log('Server working');