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

var singleMissionSchema = mongoose.Schema({
    index       :       Number,
    uid         :       String,
    facility    :       [String],
    status      :       String,
    date        :       Date,
    manager     :       String,
    worker      :       [String],
    abstract    :       String,
    notes       :       [String]
});

var rollMissionSchema = mongoose.Schema({
    index       :       Number,
    uid         :       String,
    facility    :       [String],
    category    :       String,
    dates       :       [Number],
    abstract    :       String
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

module.exports.singleMission    = mongoose.model('SingleMissions',  singleMissionSchema );

module.exports.rollMission      = mongoose.model('RollMissions',    rollMissionSchema   );

module.exports.notification     = mongoose.model('Notifications',   notificationSchema  );