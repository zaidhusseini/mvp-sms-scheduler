const express = require('express');
const app = express();
const router = require('./router');

app.use(express.static('./client/public'));

app.use('/send', router);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}!`));