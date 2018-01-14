require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/database');
const tempmonController = require('./controllers/tempmon');
// const temperatureRecorder = require('./workers/temprecorder');
const arduinoWorker = require('./workers/streamReader');

const app = express();
const port = process.env.PORT || 4000;
let isLocal = port === 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use('/', tempmonController);

console.log('Hello world');

app.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});

mongoose.connect(isLocal ? config.database.local : config.database.mlab , {
	useMongoClient: true
});


arduinoWorker.recordStreams();
// temperatureRecorder.recordTemperatures();