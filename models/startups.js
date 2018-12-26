const Influx = require('influx');
const chalk = require('chalk');

const startupsModel = new Influx.InfluxDB({
 host: 'localhost',
 database: 'startups',
})

const initStartups = function() {
  const influx = new Influx.InfluxDB({ host: "localhost" });
  influx.getDatabaseNames().then(dbNames => { 
    if(!dbNames.includes('startups')) {
      influx.createDatabase('startups');
    } 
  });

  incrementStartups();
  logStartupsCount();
}

const incrementStartups = function() {
  startupsModel.writePoints([{
    measurement: 'startup',
    fields: {
      device: "berend's macbook pro"
    }
  }])
}

const logStartupsCount = function() {
  startupsModel.query('SELECT * FROM startup').then(result => {
    console.log(chalk.grey('Application was started for the ') + chalk.yellow(result.length) + chalk.grey('th time.'))
  })
}

module.exports.startupsModel = startupsModel;
module.exports.initStartups = initStartups;