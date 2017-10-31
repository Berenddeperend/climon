const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const tempmon = require('./controllers/tempmon');

const app = express();
const port = 4000;

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tempmon);

app.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});


mongoose.connect(config.database, {
	useMongoClient: true
});