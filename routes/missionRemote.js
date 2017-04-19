/**
 * Created by philic on 2017/3/30.
 */

var User = require('../routes/db').user;
var Facility = require('../routes/db').facility;
var SingleMission = require('../routes/db').singleMission;
var RollMission = require('../routes/db').rollMission;
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
    // var mission = new RollMission({uid: 1000});
    // mission.save();
    // res.send(200);
    var sortDoc = function(a, b) {
        return a.index < b.index;
    };
    if(req.body.category === 'SINGLE') {
        SingleMission.find(function(err, doc) {
            if(err) {
                res.send({code: 300});
                return console.error(err);
            } else {
                doc.sort(sortDoc);
                res.send({code: 200, index: doc[0].index*1+1});
            }
        });
    } else if(req.body.category === 'ROLL') {
        RollMission.find(function(err, doc) {
            if(err) {
                res.send({code: 300});
                return console.error(err);
            } else {
                doc.sort(sortDoc);
                res.send({code: 200, index: doc[0].index*1+1});
            }
        });
    } else {
        res.send({code: 301});
    }
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

router.post('/getAllMissionIntros', function(req, res, next) {
    Mission.find(function(err, doc) {
        if(err) {
            res.send({code: 300});
            return console.error(err);
        } else {
            var resArr = [];
            console.log(doc);
            doc.map(function(mission) {
                res.Arr.push({
                    status: mission.status
                });
            });
            res.send({code: 200});
        }
    });
});





module.exports = router;