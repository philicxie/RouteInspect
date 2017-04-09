/**
 * Created by philic on 2017/3/22.
 */

var Notification = require('../routes/db').notification;
var express = require('express');
var router = express.Router();

router.post('/getNotificationsOnUser', function(req, res, next) {
    Notification({userId: req.body.userId}, function(err, doc) {
        if(err) {
            res.send({code: 300});
            return console.error(err);
        }
        if(doc.length === 0) {
            res.send({code: 201});
        } else {
            res.send({
                code: 200,
                notifications: doc
            });
        }
    });
});

module.exports = router;