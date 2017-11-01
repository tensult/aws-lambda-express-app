//@ts-check

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var path = require('path');

var searchRoute = require('./routes/search');

var createRoute = require('./routes/create');

var deleteRoute = require('./routes/delete');

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const apiGatewayHeaderString = req.get('x-apigateway-event');
  if (apiGatewayHeaderString) {
    const apiGatewayHeader = JSON.parse(decodeURIComponent(apiGatewayHeaderString));
    res.locals.stageUrl = '/' + apiGatewayHeader.requestContext.stage;
  }
  else {
    res.locals.stageUrl = '';
  }
  next();
});
app.use('/search', searchRoute);

app.use('/create', createRoute);

app.use('/delete', deleteRoute);

app.use(function (err, req, res, next) {
  if (err.name == 'ValidationError') {
    console.log(err.name);
    res.status(404).send(err.message);
  }
  else {
    console.error(err);
  }
});

app.listen(3000);

module.exports = app;