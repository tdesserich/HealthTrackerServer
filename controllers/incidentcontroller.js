var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Incident = sequelize.import('../models/incident');


//Create an incident
router.post('/', function(req, res) {
    var event = req.body.incident.event;
    var date = req.body.incident.date;
	var description = req.body.incident.description;
    var owner = req.user.id;

    Incident
        .create({
            event: event,
            date: date,
            description: description,
            owner: owner
        })
        .then(
            function createSuccess(createIncident) {
                res.json(createIncident);
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});   


//Get all items for a user
router.get('/', function(req, res) {
    var userid = req.user.id;

    Incident
        .findAll({
            where: { owner: userid }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});


//Get single item for a user by id
router.get('/:id', function(req, res) {
var data = req.params.id;
var userid = req.user.id;

Incident
    .findOne({
        where: { id: data, owner: userid }
    }).then(
        function findOneSuccess(data) {
            console.log(data)
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});


//Update an item
router.put('/:id', function(req, res) {
    var data = req.params.id; 
    var event = req.body.incident.event;
    var date = req.body.incident.date;
	var description = req.body.incident.description;
    var owner = req.user.id;

    Incident
        .update({ 
            event: event,
            date: date,
            description: description,
            owner: owner

        },
        {where: {id:data}, returning: true, plain: true} 
        ).then(
            function updateSuccess(putIncident) { 

                var updatedIncident = putIncident[1];
                res.json(updatedIncident);            
            },
            function updateError(err){ 
                res.send(500, err.message);
            }
        )
});


//Delete an item
router.delete('/:id', function(req, res) {
    var userid = req.user.id; 
    var data = req.params.id; 

    Incident
        .destroy({ 
            where: { id: data, owner: userid } 
        }).then(
            function deleteLogSuccess(data){ 
                res.send("You removed a log");
            },
            function deleteLogError(err){ 
                res.send(500, err.message);
            }
        );
});


module.exports = router;