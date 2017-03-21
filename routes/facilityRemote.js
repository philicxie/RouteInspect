/**
 * Created by philic on 2017/3/18.
 */
var Facility = require('../routes/db').facility;
var express = require('express');
var router = express.Router();

router.post('/getFacilityCates', function(req, res, next) {
    Facility.distinct('name', function(err, doc){
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc);
    });
});

router.post('/getAllFacility', function(req, res, next) {
    Facility.find(function(err, doc){
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc);
    });
});

module.exports = router;