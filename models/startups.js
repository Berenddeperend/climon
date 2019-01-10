const Influx = require('influx');
const chalk = require('chalk');
const retry = require('async').retry;
const listDatabases = require('./general').listDataBases;

const startupsModel = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST,
  port: process.env.INFLUX_PORT,
  database: 'startups',
})

const initStartups = async function() {
  return new Promise((resolve, reject) => {
    listDatabases().then(dbNames => {
      if(!dbNames.includes('startups')) {
        influx.createDatabase('startups').then(resolve());
      } else {
        resolve();
      }
    }).catch((reason) => {
      reject(reason);
    });
  })
    .then(incrementStartups)
    .then(logStartupsCount)
    .catch((reason) => {
      throw new Error(reason)
    });
}

const incrementStartups = function() {
  return new Promise((resolve, reject) => {
    startupsModel.writePoints([{
      measurement: 'startup',
      fields: {
        device: "berend's macbook pro"
      }
     }]
    ).then(resolve())
     .catch(reason => {
       console.log('ook hier, i dunno');
       reject(reason);
     });
  });
}

const logStartupsCount = function() {
  startupsModel.query('SELECT * FROM startup').then(result => {
    console.log(chalk.grey('Application was started for the ') + chalk.yellow(result.length) + chalk.grey('th time.'))
  }).catch(reason => {
    throw new Error(reason);
  })
}

module.exports.startupsModel = startupsModel;
module.exports.initStartups = initStartups;