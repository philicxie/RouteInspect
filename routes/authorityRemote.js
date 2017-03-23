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

router.post('/rmUserById', function(req, res, next) {
    console.log(req.data);
    User.remove({_id: req.data}, function(err, doc) {
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc);
    });
});

router.post('/addUser', function(req, res, next) {
    console.log(res.data);
    var addUser = new User(res.data);
    addUser.save(function(err, doc) {
        if(err) return console.error(err);
        console.log(doc);
        res.send('Add Success');
    });
})


module.exports = router;