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



router.post('/addUser', function(req, res, next) {
    //console.log(req.body);
    var addUser = new User({
        name: req.body.name,
        account: req.body.account,
        password: 'asdffdsa',
        auth: 100*req.body.au_admin+10*req.body.au_manager+req.body.au_clerk
    });
    console.log(addUser);
    addUser.save(function(err, doc) {
        if(err) return console.error(err);
        console.log(doc);
        res.send(doc._id);
    });
});

router.post('/rmUserById', function(req, res, next) {
    console.log(req.body);
    User.remove({_id:req.body._id}, function(err, doc) {
        if(err) res.send(err);
        res.send(doc);
    })
});




module.exports = router;