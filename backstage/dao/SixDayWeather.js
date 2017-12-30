var request = require('request');
var parseString = require('xml2js').parseString;



module.exports = {
   getSixDayWeather:function (req,res) {
       var param = req.query || req.params;
       var city = encodeURIComponent(param.city)
       request('http://newweather.3gpk.net/SixWeather.aspx?city='+city, function (error, response, body) {
           console.log('error:', error); // Print the error if one occurred
           console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          // console.log('body:',body); // Print the HTML for the Google homepage.
           parseString(body, { explicitArray : false, ignoreAttrs : true} ,function (err, result) {
               res.json(result)
           });

       });
   }
}
