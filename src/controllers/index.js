var path = require('path');
var time = new Date().getTime();

var main = function(req, res){
	res.sendFile(path.resolve(__dirname+'../../../client/client.html'));
};

module.exports.main = main;