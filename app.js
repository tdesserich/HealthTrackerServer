require('dotenv').config();

var express = require('express');
var app = express();
var currentMeds = require('./controllers/currentmedscontroller');
var discMeds = require('./controllers/discmedscontroller');
var incident = require('./controllers/incidentcontroller')
var user = require('./controllers/usercontroller')
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync({force: true});
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

//Exposed route
app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the server.");
   });
app.use('/user', user);

//Protected routes
app.use(require('./middleware/validate-session'));
app.use('/currentmeds', currentMeds);
app.use('/discmeds', discMeds);
app.use('/incident', incident);

app.listen(3000, function(){
    console.log('App is listening on 3000')
});