const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').load();

//TWILIO AUTH
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioSender = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid,authToken);
const testNumber = process.env.TEST_PHONE_NUMBER;

router.use(bodyParser.json());

router.post('/', async (req,res) => {
  console.log(req.body)

  const confirmation = await client.messages.create({
    to: req.body.to,
    from: twilioSender,
    body: req.body.body,
    //mediaUrl: 'https://picsum.photos/800/600?image=999',
  });
  
  res.status(200).send(confirmation);

});




module.exports = router;