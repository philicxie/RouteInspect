/**
 * Created by philic on 2017/3/15.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RouteInspect');

var userSchema = mongoose.Schema({
    name: String,
    password: String,
    auth: Number
});

var facilitySchema = mongoose.Schema({
    name: String,
    uid: String,
    area: String,
    address: String,
    position: [Number],
    status: String,
    category: String
});

module.exports.user = mongoose.model('Users', userSchema);

module.exports.facility = mongoose.model('Facilities', facilitySchema);