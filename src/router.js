var controllers = require('./controllers');

var router = function(app) {
	
	app.get('/', controllers.main);

};

module.exports = router;