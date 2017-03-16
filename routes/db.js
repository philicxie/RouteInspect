/**
 * Created by philic on 2017/3/15.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RouteInspect');

var userSchema = mongoose.Schema({
    name: String,
    password: String
});

module.exports.user = mongoose.model('Users', userSchema);