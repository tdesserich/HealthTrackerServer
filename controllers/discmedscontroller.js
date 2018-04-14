var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var DiscMeds = sequelize.import('../models/discmeds');


//Create a discMeds instance
router.post('/', function(req, res) {
    var medicationName = req.body.discMeds.medicationName;
    var reason = req.body.discMeds.reason;
    var dosage = req.body.discMeds.dosage;
    var frequency = req.body.discMeds.frequency;
    var endDate = req.body.discMeds.endDate;
    var owner = req.user.id;

    DiscMeds
        .create({
            medicationName: medicationName,
            reason: reason,
            dosage: dosage,
            frequency: frequency,
            endDate: endDate,
            owner: owner
        })
        .then(
            function createSuccess(createDiscMeds) {
                res.json(createDiscMeds);
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});   


//Get all items for a user
router.get('/', function(req, res) {
    var userid = req.user.id;

    DiscMeds
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

DiscMeds
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
    var discMeds = req.body.discMeds.result;
    var medicationName = req.body.discMeds.medicationName;
    var reason = req.body.discMeds.reason;
    var dosage = req.body.discMeds.dosage;
    var frequency = req.body.discMeds.frequency;
    var endDate = req.body.discMeds.startDate;

    DiscMeds
        .update({ 
            result: discMeds,
            medicationName: medicationName,
            reason: reason,
            dosage: dosage,
            frequency: frequency,
            endDate: endDate
        },
        {where: {id:data}, returning: true, plain: true} 
        ).then(
            function updateSuccess(putDiscMeds) { 

                var updatedDiscMeds = putDiscMeds[1];
                res.json(updatedDiscMeds);            
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

    DiscMeds
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