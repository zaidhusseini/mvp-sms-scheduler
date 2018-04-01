const mongoose = require('mongoose');
require('dotenv').load(); 

mongoose.connect(`mongodb://${process.env.MONGO_URL}/messages`);

const Schema = mongoose.Schema;

const schedulerSchema = new Schema({
  toNumber: String,
  body: String,
  date: {type: Date, default: Date.now},
});

const Scheduler = mongoose.model('messages', schedulerSchema);

const test = {
  toNumber: process.env.TEST_PHONE_NUMBER,
  body: 'test message',
  date: Date.now() + 60000
}


Scheduler.create(test, (err, result) =>{
  if (err) return console.log(err);
  console.log(result);
  mongoose.connection.close();
});

module.exports.Scheduler = Scheduler;