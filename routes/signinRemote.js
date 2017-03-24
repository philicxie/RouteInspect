/**
 * Created by philic on 2017/3/22.
 */
var User = require('../routes/db').user;
var express = require('express');
var router = express.Router();


router.post('/checkUser', function(req, res, next) {
    console.log(req.data);
    User.find({account: req.data.account}, function(err, doc) {
        if(err) {
            res.send(500);
            return console.error(err);
        }
        if(req.data.password === doc.password) {
            res.send(200);
        } else {
            res.send(300);
        }
    });
});


module.exports = router;