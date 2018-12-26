const Influx = require('influx');

const climateModel = new Influx.InfluxDB({
 host: 'localhost',
 database: 'climon',
})

const initClimonDb = function() {
  console.log('initializing climondb')
  return new Promise((resolve, reject) => {
    const influx = new Influx.InfluxDB({ host: "localhost" });
    influx.getDatabaseNames().then(dbNames => { 
      if(!dbNames.includes('climon')) 
      {
        console.log('creating climondb')
        influx.createDatabase('climon').then(resolve());
      } else {
        console.log('it already exsisted')
        resolve();
      } 
    });
  })
}

module.exports.climateModel = climateModel;
module.exports.initClimonDb = initClimonDb;