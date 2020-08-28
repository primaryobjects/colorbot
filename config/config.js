var config = {};

config.mongo = {};
config.mongo.connectionString = process.env.MONGO_URL;

config.gmail = {};
config.gmail.username = '';
config.gmail.password = '';

module.exports = config;