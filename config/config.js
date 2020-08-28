var config = {};

config.mongo = {};
config.mongo.connectionString = process.env.MONGO_URL;

module.exports = config;