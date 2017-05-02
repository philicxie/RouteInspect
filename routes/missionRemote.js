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

router.post('/findMission', function(req, res, next) {
    console.log(req.body);
    if(req.body.category === 'ROLL') {
        console.log('get here');
        RollMission.find({uid: req.body.uid}, function(err, doc) {
            if(err) {
                res.send({code: 300});
                return console.error(err);
            } else if(doc.length === 0) {
                res.send({code: 301});
            } else {
                res.send({code: 200, mission: doc[0]});
            }
        });
    } else if(req.body.category === 'SINGLE') {
        SingleMission.find({uid: req.body.uid}, function(err, doc) {
            if(err) {
                res.send({code: 300});
                return console.error(err);
            } else if(!doc.length) {
                res.send({code: 301});
            } else {
                res.send({code: 200, mission: doc[0]});
            }
        });
    } else {
        res.send({code: 301});
    }
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
    if(req.body.category === 'SINGLE') {
        var initSingleMission = new SingleMission(req.body.mission);
        initSingleMission.save(function(err, doc) {
            if(err) {
                res.send({code: 301});
                return console.error(err);
            } else {
                res.send({code: 200});
            }
        });
    } else if(req.body.category === 'ROLL') {
        var initRollMission = new RollMission(req.body.mission);
        initRollMission.save(function(err, doc) {
            if(err) {
                res.send({code: 301});
                return console.error(err);
            } else {
                res.send({code: 200});
            }
        });
    } else {
        res.send({code: 300});
    }
});

router.post('/getAllMissionIntros', function(req, res, next) {
    var weekDic = ['周日','周一','周二','周三','周四','周五','周六'];
    RollMission.find(function(err, doc) {
        if(err) {
            res.send({code: 300});
            return console.error(err);
        } else {
            var resArr = [];
            console.log(doc);
            doc.map(function(mission) {
                var date = '';
                switch (mission.category) {
                    case 'DAY':
                        date = '每天';
                        break;
                    case 'WEEK':
                        date = '每' + weekDic[mission.dates[0]];
                        for(var i=1;i<mission.dates.length;i++) {
                            date += ', ' + weekDic[mission.dates[i]];
                        }
                        break;
                    case 'MONTH':
                        date = '每月' + (mission.dates[0]+1) + '日';
                        for(var i=1;i<mission.dates.length;i++) {
                            date += ', ' + (mission.dates[i]+1) + '日';
                        }
                        break;
                    default:
                        break;
                }
                resArr.push({
                    status: 'PLANNING',
                    uid: mission.uid,
                    date: date,
                    category: 'ROLL',
                    facility: mission.facility.join(", ")
                });
            });
            SingleMission.find(function(err, doc) {
                if(err) {
                    res.send({code: 300});
                    return console.error(err);
                } else {
                    doc.map(function(mission) {
                        resArr.push({
                            status: mission.status,
                            uid: mission.uid,
                            date: mission.date.getFullYear()+'年'+(mission.date.getMonth()+1)+'月'+mission.date.getDate()+ '日',
                            category: 'SINGLE',
                            facility: mission.facility.join(", "),
                            manager: mission.manager
                        });
                    });
                }
                res.send({code: 200, missions: resArr});
            });
        }
    });
});





module.exports = router;