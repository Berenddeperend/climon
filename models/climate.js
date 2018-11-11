const Influx = require('influx');

const climateModel = new Influx.InfluxDB({
 host: 'localhost',
 database: 'climon',
})

const initClimonDb = function() {
  const influx = new Influx.InfluxDB({ host: "localhost" });
  influx.getDatabaseNames().then(dbNames => { 
    if(!dbNames.includes('climon')) {
      influx.createDataBase('climon');
    } 
  });
}

const query = function(query) {
  // SELECT mean("light") AS "mean_light" FROM "climon"."autogen"."light(measurement)" WHERE time > now() - 6h GROUP BY time(1000s);
  return climateModel.query(query)
}

module.exports.climateModel = climateModel;
module.exports.initClimonDb = initClimonDb;
module.exports.query = query;