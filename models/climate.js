const Influx = require('influx');

const climateModel = new Influx.InfluxDB({
 host: 'localhost',
 database: 'climon',
})

const initClimonDb = function() {
  const influx = new Influx.InfluxDB({ host: "localhost" });
  influx.getDatabaseNames().then(dbNames => { 
    if(!dbNames.includes('climon')) {
      influx.createDatabase('climon');
    } 
  });

}

module.exports.climateModel = climateModel;
module.exports.initClimonDb = initClimonDb;