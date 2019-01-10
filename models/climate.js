const Influx = require('influx');

const climateModel = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST,
  port: process.env.INFLUX_PORT,
  database: 'climon',
})

const initClimonDb = function() {
  return new Promise((resolve, reject) => {
    const influx = new Influx.InfluxDB({
        host: process.env.INFLUX_HOST,
        port: process.env.INFLUX_PORT,
      });
    influx.getDatabaseNames().then(dbNames => { 
      if(!dbNames.includes('climon')) {
        influx.createDatabase('climon').then(resolve());
      } else {
        resolve(); 
      } 
    }).catch((reason) => {
      console.log('influx.getDaataBaseNames failed, because: ')
      console.log(reason)
      reject(reason);
    });
  })
}

module.exports.climateModel = climateModel;
module.exports.initClimonDb = initClimonDb;