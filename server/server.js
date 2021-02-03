const express = require('express');
const app = express();
const cors = require('cors');

//using morgan
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(morgan('short'));

app.use(cors());
app.use(bodyParser.json());

//routes
const volumeRoute = require('./routes/volume');
const mediaRoute = require('./routes/media');
const infoRoute = require('./routes/info');
const progressRoute = require('./routes/progress');

//middleware
app.use('/volume', volumeRoute);
app.use('/media', mediaRoute);
app.use('/info', infoRoute);
app.use('/progress', progressRoute);

app.listen(3005, () => {
	console.log('running on 3005...');
});
