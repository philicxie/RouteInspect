/**
 * Created by philic on 2017/3/22.
 */
var User = require('../routes/db').user;
var express = require('express');
var router = express.Router();


router.post('/checkUser', function(req, res, next) {
    console.log(req.body);
    User.find({account: req.body.account}, function(err, doc) {
        if(err) {
            res.send({
                code: 500
            });
            return console.error(err);
        }
        console.log(doc);
        if(doc.length === 1 && req.body.password === doc[0].password) {
            res.send({
                code: 200,
                user: doc[0]
            });
        } else {
            res.send({
                code: 300
            });
        }
    });
});


module.exports = router;