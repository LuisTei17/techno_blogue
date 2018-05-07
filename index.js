var bodyParser = require("body-parser");
var express = require("express");
var mongo = require('mongodb');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var consign = require('consign');

var app = express();

mongoose.connect('mongodb://localhost:27017/technoblog');
var db = mongoose.connection;

// Iniciando o aplicativo
var app = express();

// Dizendo onde est? a aplica??o cliente
app.set('clientPath', path.join(__dirname, '..', 'client'));

// Permitindo cors
app.use(cors())

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require('method-override')());

// Recebemos logs mais detalhados
app.use(morgan('dev'));

// Usando consgin para chamar arquivos
consign({cwd:'app'})
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app)

// Dizendo qual a porta em que rodar? 
//(process.env.PORT ? a porta do Heroku)
app.set('port', (process.env.PORT || 4030));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});