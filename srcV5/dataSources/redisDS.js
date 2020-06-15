const redis = require('redis');
const { promisify } = require("util");

const { redisDs: { host, port, database } } = require('./datasources.json');

const url = `redis://${host}:${port}/${database}`;

const client = redis.createClient(url);

client.on('connect', function () {
    console.log(`Redis connected: ${url}`);
});

client.on('error', function (err) {
    console.error('Redis connection error: ', err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const setexAsync = promisify(client.setex).bind(client);

module.exports = {
    client,
    getAsync,
    setAsync,
    setexAsync
};