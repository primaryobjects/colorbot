var mongo = require('mongoskin')
	config = require('../config/config');

MongoManager = {
	findRandom: function(count, callback) {
		var index = Math.floor(Math.random()*(250 - count)); // choose a random index

		// Get collection.
		mongo.db(config.mongo.connectionString).collection('image').find().limit(count).skip(index).toArray(function (err, items) {
			if (!err && items != null) {
				if (callback != null) {
					callback(items);
				}
			}
		});
	}
};