/**
 * Created by philic on 2017/3/15.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RouteInspect');

var userSchema = mongoose.Schema({
    account     :       String,
    name        :       String,
    password    :       String,
    auth        :       Number
});

var facilitySchema = mongoose.Schema({
    name        :       String,
    uid         :       String,
    area        :       String,
    address     :       String,
    position    :       [Number],
    status      :       String,
    category    :       String
});

var missionSchema = mongoose.Schema({
    uid         :       String,
    facility    :       [String],
    status      :       String,
    category    :       String,
    date        :       Date,
    time        :       Number,
    manager     :       String,
    worker      :       [String],
    abstract    :       String,
    notes       :       [String]
});

var notificationSchema = mongoose.Schema({
    userId      :       String,
    title       :       String,
    time        :       Date,
    url         :       String,
    notes       :       [String]
});

module.exports.user             = mongoose.model('Users',           userSchema          );

module.exports.facility         = mongoose.model('Facilities',      facilitySchema      );

module.exports.mission          = mongoose.model('Missions',        missionSchema       );

module.exports.notification     = mongoose.model('Notifications',   notificationSchema  );