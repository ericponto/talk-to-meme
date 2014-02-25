var meme_server = {
	init: function(){
		//Config
		var port = process.env.PORT || 5000;

		var memeGeneratorCredentials = {
				username:'toily_meme_generator',
				password:'toily_meme_generatorpass'
		};

		//Dependencies
		express              = require('express');
		http_get             = require('http-get');
		MemeGenClient        = require('memegenclient');

		app = express();
		memeGenClient = new MemeGenClient(memeGeneratorCredentials);

		app.get('/search/:query', function(req, res){
			
			memeGenClient.generatorsSearch({
				q: req.params.query,
				pageIndex: 0,
				pageSize: 1
			}).on('data', function (data) {
				data = JSON.parse(data);
				res.send(data);
			}).exec();
		});

		//express configure app
		app.configure(function(){
			app.set('port', port);
			app.use(express.static(__dirname + '/site'));
		});

		//Create server
		app.listen(port, function(){
			console.log("Express server listening on port " + port);
		});

	}
};

meme_server.init();