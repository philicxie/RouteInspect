/**
 * Created by philic on 2017/3/22.
 */
/**
 * Created by philic on 2017/3/18.
 */
var User = require('../routes/db').user;
var express = require('express');
var router = express.Router();

router.post('/getAllUsers', function(req, res, next) {
    User.find(function(err, doc) {
        if(err) return console.error(err);
        res.send(doc);
    });
});


module.exports = router;