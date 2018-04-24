require('dotenv').config();

var express = require('express');
var app = express();
var currentMeds = require('./controllers/currentmedscontroller');
var discMeds = require('./controllers/discmedscontroller');
var incident = require('./controllers/incidentcontroller')
var user = require('./controllers/usercontroller')
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

//Exposed route
app.use('/user', user);

//Protected routes
app.use(require('./middleware/validate-session'));
app.use('/currentmeds', currentMeds);
app.use('/discmeds', discMeds);
app.use('/incident', incident);

app.listen(process.env.PORT, function(){
    console.log(`App is running on ${process.env.PORT}`)
})