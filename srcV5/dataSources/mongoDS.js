const mongoose = require('mongoose');

const { mongodbDs: { host, port, database, useNewUrlParser } } = require('./datasources.json');

const url = `mongodb://${host}:${port}/${database}`;

mongoose.connect(url, { useNewUrlParser });

const db = mongoose.connection;

db.once('open', _ => console.log('MongoDB connected:', url));

db.on('error', err => console.error('MongoDB connection error:', err));

module.exports = db;