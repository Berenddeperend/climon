const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/database');
const tempmonController = require('./controllers/tempmon');
const temperatureModel = require('./models/temperature');
const temperatureRecorder = require('./workers/temprecorder');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tempmonController);

app.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});

mongoose.connect(config.database, {
	useMongoClient: true
});


// temperatureRecorder.recordTemperatures();
