const Influx = require('influx');
const chalk = require('chalk');
const { initDb } = require('./general');

const startupsModel = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST,
  port: process.env.INFLUX_PORT,
  database: 'startups',
})

const initStartups = async function() {
      initDb('startups')
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
        device: process.env.DEVICE
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