
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , about = require('./routes/about')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , methodOverride = require('method-override')
  , bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(cookieParser('neuralnetworkcolorbot'));
app.use(session({ resave: true, saveUninitialized: true, secret: 'hfkjdsjfkrestu'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.pretty = true;

app.get('/', routes.index);
app.post('/', routes.upload);
app.get('/data', routes.data);
app.get('/about', about.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
