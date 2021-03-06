const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Scheduler } = require('../database/index')
require('dotenv').load();

//TWILIO AUTH
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioSender = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid,authToken);
const testNumber = process.env.TEST_PHONE_NUMBER;
const edcCrew = process.env.EDC_CREW;

router.use(bodyParser.json());

//When a message is received for scheduling from client, store in DB
router.post('/', async (req, res)=>{
 
  let numbersToBeScheduled = req.body.to.split(','); //split numbers by comma
  let results = [];

  let indexOfEDC = numbersToBeScheduled.indexOf('332'); //Returns index of Telenumeric Code for "EDC" Crew if found
  
  //if EDC ('332') found 
  if (indexOfEDC !== -1){
    numbersToBeScheduled.splice(indexOfEDC,1); //remove '332'
    let edcCrewArray = edcCrew.split(','); //turn into an array
    numbersToBeScheduled.push(...edcCrewArray); //add individual edc crew numbers
  }
  console.log('here are numbers to be scheduled', numbersToBeScheduled);
  for (let i = 0; i < numbersToBeScheduled.length; i++){
    
    let message = {
      toNumber: numbersToBeScheduled[i],
      body: req.body.body,
      date: req.body.date
    };
    console.log('this is the message', message);

    console.log('dates', req.body.date, new Date(req.body.date));

    try {
      let response = await Scheduler.create(message);
      results.push(response);
      console.log('message saved');
    }

    catch (err) {
      res.status(501).send(err);
      console.log(err);
    }

  }

  res.send(results);

});


//Check every second if a message should be sent, if a message should be sent at this time then send it
const checkScheduledMessages = async function(){
  const MS_PER_MINUTE = 60000;
  const currentDate = new Date();
  const bufferedTime = new Date(currentDate.getTime() - MS_PER_MINUTE * 0.5); //buffer a little bit of time to ensure messages fetched from DB don't get missed
  
  //look for all scheduled messages in the next 5 minutes
  let scheduledMessages = await Scheduler.find({date: {"$gte": bufferedTime, "$lt": new Date(currentDate.getTime() + MS_PER_MINUTE * 5 )}})

  scheduledMessages.forEach( async (message)=>{

    let currentTime = new Date();
    if (message.date.getMinutes() === currentTime.getMinutes()){
      console.log('Sending message', message);
      
      //send message via Twilio
      try{
        const confirmation = await client.messages.create({
          to: message.toNumber,
          from: twilioSender,
          body: message.body,
        });

        //use mediaUrl: 'https://picsum.photos/800/600?image=999' to send images,
    
        //delete message from DB once sent
        await Scheduler.find({_id:message._id}).remove().exec();
        console.log('message deleted');
      }

      catch (err){
        console.log(err);
      }

    }

  });

}



setInterval(checkScheduledMessages, 5000);



module.exports = router;