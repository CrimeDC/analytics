var express 		= require('express.io');
var app 			= express();
var request 		= require('request');
var moment 			= require('moment');
var _ 				= require('lodash');
var fs				= require('fs');
var http			= require('http');
var geolib 			= require('geolib');
var mongoose		= require('mongoose');
var connect 		= require('connect');


//////////////////////////////////
// Express app config
/////////////////////////////////

app.engine('ejs', require('ejs-locals'));//.renderFile);
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(express.bodyParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout: "template.html"});
app.use(express.cookieParser('cookieKey81472321530089'));
app.use(express.session({
    secret: 'sessionSedfgsl2348df147530089',
    cookie: {maxAge : 7200000} // Expiers in 2 hours
    }));
app.http().io();

var thisURL = 
/********************* MONGOOSE INIT ****************************/

// Live Development

mongoose.connect('mongodb://ari:arielle@oceanic.mongohq.com:10059/bar');

// Local Development
//mongoose.connect('localhost');

var db = mongoose.connection;

// Error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
  console.log('Connected to DB');
});


var Page = mongoose.model('Page', {
	pageName 		: String,
	createdAt 		: String,
	bodyCode 		: String,
	scriptCode 		: String,
	timestamp		: String                              
});
var User = mongoose.model('user', {
	username : String,
	password : String                                      
});

var Pic = mongoose.model('pic', {
	image : String,
	desc : String,
	meta : String                                    
});

//////////////////////////////////
// Express handlers
/////////////////////////////////
app.get('/', function(req, res) {
	res.render('index');
	
});



app.get('/logout', function(req, res) {
	req.session.sid = null;
	req.redirect('/');
});
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

