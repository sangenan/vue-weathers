var express = require('express');
var router = express.Router();
var SixDayWeather = require('../dao/SixDayWeather')
/* GET home page. */
router.get('/getSixDayWeather', function(req, res, next) {
    SixDayWeather.getSixDayWeather(req,res)
});

module.exports = router;
