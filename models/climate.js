const Influx = require('influx');

const climateModel = new Influx.InfluxDB({
 host: 'localhost',
 database: 'climon',
})

const initClimonDb = function() {
  return new Promise((resolve, reject) => {
    const influx = new Influx.InfluxDB({ host: "localhost" });
    influx.getDatabaseNames().then(dbNames => { 
      if(!dbNames.includes('climon')) {
        influx.createDatabase('climon').then(resolve());
      } else {
        resolve();
      } 
    });
  })
}

module.exports.climateModel = climateModel;
module.exports.initClimonDb = initClimonDb;