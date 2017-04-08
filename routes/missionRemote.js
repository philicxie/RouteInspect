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
    });
});

router.post('/createMission', function(req, res, next) {
    // var mission = new Mission({uid: 1000});
    // mission.save();
    // res.send(200);
    var sortDoc = function(a, b) {
        return a.uid > b.uid;
    };
    Mission.find(function(err, doc) {
        if(err) {
            return console.error(err);
        }
        console.log(doc);
        doc.sort(sortDoc);
        var initId = doc[0].uid*1+1;
        var initMission = new Mission({
            uid: initId,
            status: 0
        });
        initMission.save();
        res.send(initId);
    });
});

router.post('/commitMission', function(req, res, next) {

});

router.post('/updateMission', function(req, res, next) {

});

module.exports = router;