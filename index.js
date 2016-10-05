var express = require('express');
var csv = require('csv');
var bodyParser = require('body-parser');
var multer = require('multer');
var expressStatic = require('express-static');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path')
var exphbs  = require('express-handlebars');
var upload = multer();
var app = express();
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})


app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/sums/:first/:second', function (request, response) {
  var result = Number(request.params.first) + Number(request.params.second);
  response.render('sums', {
   result: result,

 });
});

app.get('/map', function (request, response) {
    response.render('map');
});

app.get('/check', function (request, response) {
    response.render('check');
});

app.get('/home', function (request, response) {
    response.render('home');
});

app.get('/geolocation', function (request, response) {
    response.render('geolocation');
});

app.get('/places', function(request, response){

  response.render('places');
});

app.use(bodyParser.urlencoded({ extended: true}));

app.use(morgan('combined', {stream: accessLogStream}));

app.get('/sums/:first/:second', function (request, response) {
 var equation = Number(request.params.first) + Number(request.params.second);
 // response.send(200, equation);
 response.status(200).send(equation.toString());
});

app.post('/postit', upload.array(), function(request, response) {
  console.log(request.body);
  var greeting = 'Hello, ' + request.body.name;
  response.status(200).send(greeting);
})

app.all('*', function(request, response) {
 response.status(404).send('I dont know this url');
});

app.listen(3300, function() {
 console.log('Server is running at localhost:3300');
});

module.exports = app;
