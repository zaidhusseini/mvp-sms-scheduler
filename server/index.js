const express = require('express');
const app = express();
const router = require('./router');
const favicon = require('serve-favicon');
const path = require('path');

app.use(favicon(path.join(__dirname,'..', 'client', 'public','images','favicon.ico')));
app.use(express.static('./client/public'));

app.use('/send', router);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}!`));