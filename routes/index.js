var neuralNetworkManager = require('../managers/neuralNetworkManager'),
	mongoManager = require('../managers/mongoManager'),
	png = require('png-js');
	
exports.index = function(req, res) {
	res.render('index');
};

exports.data = function(req, res) {
	MongoManager.findRandom(3, function(items) {
		// Run the neural network on the selected rows.
		NeuralNetworkManager.run(items, function(results) {
			res.json(results);
		});
	});
};

exports.upload = function(req, res) {
	var result = {};
	var items = [];
	var row = [];
	row.file = req.files.userfile.path;
	row.pixels = [];
	
	png.decode(req.files.userfile.path, function (pixels) {
		// pixels is a 1d array of decoded pixel data
		var channel = 0;
		var maxChannels = 3;
		
		// Make sure this is a 64x64 png.
		if (pixels.length == 16384) {
			for (var i in pixels) {
				if (isNaN(pixels[i]) || pixels[i] > 255)
					break;
				else if (channel < maxChannels) {
					// Only take the max of the selected RGB channels. For example, 1 channel for b&w. We don't care about the rest in b&w. 4 channels total (RGBA).
					row.pixels.push(pixels[i]);
				}
				
				if (channel++ >= 3) {
					channel = 0;
				}
			}
		
			items.push(row);
		
			// Run the neural network on the uploaded data.
			NeuralNetworkManager.run(items, function(results) {
				result.message = 'OK';
				result.results = results;
				res.json(result);
			});
		}
		else {
			result.message = 'Expected 16384 pixels. Got ' + pixels.length + ' instead. Please upload a 64x64 PNG image.';
			res.json(result);
		}
	});
}