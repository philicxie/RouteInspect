/**
 * Created by philic on 2017/3/30.
 */

var User = require('../routes/db').user;
var Facility = require('../routes/db').facility;
var Mission = require('../routes/db').mission;
var express = require('express');
var router = express.Router();

router.post('/getAllUsers', function(req, res, next) {
    User.find(function(err, doc) {
        if(err) return console.error(err);
        res.send(doc);
    });
});

router.post('/getAllManager', function(req, res, next) {
    User.find(function(err, doc) {
        if(err) return console.error(err);
        var resArr = [];
        doc.map(function(user) {
            if(Math.round(user.auth/10)%2 === 1) {
                resArr.push(user);
            }
        });
        res.send(resArr);
    });
});

router.post('/getAllWorker', function(req, res, next) {
    User.find(function(err, doc) {
        if(err) return console.error(err);
        var resArr = [];
        doc.map(function(user) {
            if(user.auth%2 === 1) {
                resArr.push(user);
            }
        });
        res.send(resArr);
    });
});

router.post('/getAllFacility', function(req, res, next) {
    Facility.find(function(err, doc) {
        if(err) return console.error(err);
        res.send(doc);
    })
})

module.exports = router;