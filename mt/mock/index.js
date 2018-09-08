var navJson = require('../mock/navJson.json');
var hotel = require('../mock/hotel.json');
var show = require('../mock/show.json');
var jsonObj = {
    "/api/index": navJson,
    "/api/hotel": hotel,
    "details": hotel,
    "/api/show": show
}
module.exports = function(url) {
    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }
}