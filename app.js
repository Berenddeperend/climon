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
const arduinoReader = require('./workers/streamReader');
const mockStream = require('./workers/mockStream');
const stringParser = require('./workers/stringParser');
const objStreamLogger = require('./workers/objStreamLogger');
const dbSaver = require('./workers/dbSaver');
const lightModel = require('./models/light.js').lightModel;

const app = express();
const port = process.env.PORT || 4000;
let isLocal = port === 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use('/', tempmonController);

app.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});

// mongoose.connect(isLocal ? config.database.local : config.database.mlab , {
mongoose.connect(config.database.mlab, {
	useMongoClient: true
}).then(() => {
}), (error) => { console.log(`Connect to database failed.`)};

mockStream()
	.pipe(stringParser())
	.pipe(objStreamLogger());
	// .pipe(dbSaver());