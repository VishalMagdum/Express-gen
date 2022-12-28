const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const dbName = `B40WDE`
const dbUrl = `mongodb+srv://vishal:fQkQip0SHY0tbOOB@cluster0.kkulin0.mongodb.net/${dbName}`


module.exports = { mongodb, MongoClient, dbName, dbUrl }