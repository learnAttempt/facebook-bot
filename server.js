var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
var app = express();
// app configuration
app.set('port', (process.env.PORT || 3000));

app.use(morgan('dev')); // log every request to the console.
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


require('./routes/webhook_verify')(app);
app.listen(app.get('port'), function() {
  const url = 'http://localhost:' + app.set('port');
  console.log('Application running on port: ', app.get('port'));
});
