/**
 * Created by philic on 2017/3/30.
 */

var User = require('../routes/db').user;
var Facility = require('../routes/db').facility;
var Mission = require('../routes/db').mission;
var express = require('express');
var router = express.Router();

var temMission = new Mission({uid: 1000});
temMission.save();

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
        return a.uid < b.uid;
    };
    
    Mission.find(function(err, doc) {
        if(err) {
            res.send({code: 300});
            return console.error(err);
        } else {
            doc.sort(sortDoc);
            var initId = doc[0].uid * 1 + 1;
            console.log(initId);
            var initMission = new Mission({
                uid: initId,
                status: 0
            });
            initMission.save();
            res.send({code: 200, uid: initId});
        }
    });
});

router.post('/dismissMission', function(req, res, next) {
    Mission.remove({uid: req.body.uid}, function(err, doc){
        if(err) {
            res.send({code: 300});
            return console.error(err);
        }
        console.log(doc);
        res.send({code: 200});
    })
});

router.post('/commitMission', function(req, res, next) {
    console.log(req.body);
    Mission.find({uid: req.body.uid}, function(err, doc){
        if(err) {
            res.send({code: 300});
            return console.err(error);
        }
        console.log(doc);
        doc[0].facility =   req.body.facility;
        doc[0].status =     req.body.status;
        doc[0].date =       req.body.date;
        doc[0].manager =    req.body.manager;
        doc[0].worker =     req.body.worker;
        doc[0].abstract =   req.body.abstract;
        
        doc[0].save(function(err, doc){
            if(err) {
                res.send({code: 301});
                return console.err(error);
            }
            res.send({code: 200});
        });
    });
});





module.exports = router;