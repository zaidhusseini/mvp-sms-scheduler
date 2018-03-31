const express = require('express');
const router = express.Router();
require('dotenv').load();

//TWILIO AUTH
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioSender = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid,authToken);
const testNumber = process.env.TEST_PHONE_NUMBER;

router.get('/', async (req,res) => {

  const confirmation = await client.messages.create({
    to: testNumber,
    from: twilioSender,
    body: 'Hello World'
  })
  
  res.status(200).send(confirmation);

});




module.exports = router;