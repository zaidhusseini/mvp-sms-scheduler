const mongoose = require('mongoose');
require('dotenv').load(); 

mongoose.connect(`mongodb://${process.env.MONGO_URL}/messages`);
console.log('mongo connected');
const Schema = mongoose.Schema;

const schedulerSchema = new Schema({
  toNumber: String,
  body: String,
  date: {type: Date, default: Date.now},
});

const Scheduler = mongoose.model('messages', schedulerSchema);


module.exports.Scheduler = Scheduler;