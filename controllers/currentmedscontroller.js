var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var CurrentMeds = sequelize.import('../models/currentmeds');


//Create a currentMeds instance
router.post('/', function(req, res) {
    var medicationName = req.body.currentMeds.medicationName;
    var reason = req.body.currentMeds.reason;
    var dosage = req.body.currentMeds.dosage;
    var frequency = req.body.currentMeds.frequency;
    var startDate = req.body.currentMeds.startDate;
    var owner = req.user.id;
  

    CurrentMeds
        .create({
            medicationName: medicationName,
            reason: reason,
            dosage: dosage,
            frequency: frequency,
            startDate: startDate,
            owner: owner
        })
        .then(
            function createSuccess(createCurrentMeds) {
                res.json(createCurrentMeds);
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});   


//Get all items for a user
router.get('/', function(req, res) {
    var userid = req.user.id;

    CurrentMeds
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

CurrentMeds
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
    var currentMeds = req.body.currentMeds.result;
    var medicationName = req.body.currentMeds.medicationName;
    var reason = req.body.currentMeds.reason;
    var dosage = req.body.currentMeds.dosage;
    var frequency = req.body.currentMeds.frequency;
    var startDate = req.body.currentMeds.startDate;

    CurrentMeds
        .update({ 
            result: currentMeds,
            medicationName: medicationName,
            reason: reason,
            dosage: dosage,
            frequency: frequency,
            startDate: startDate
        },
        {where: {id:data}, returning: true, plain: true} 
        ).then(
            function updateSuccess(putCurrentMeds) { 

                var updatedCurrentMeds = putCurrentMeds[1];
                res.json(updatedCurrentMeds);            
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

    CurrentMeds
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

