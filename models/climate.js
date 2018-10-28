const Influx = require('influx');

const climateModel = new Influx.InfluxDB({
 host: 'localhost',
 database: 'climon',
//  schema: [
//    {
//      measurement: 'moisture',
//      fields: {
//        path: Influx.FieldType.STRING,
//        duration: Influx.FieldType.INTEGER
//      },
//      tags: [
//        'host'
//      ]
//    }
//  ]
})

const query = function(query) {
  // SELECT mean("light") AS "mean_light" FROM "climon"."autogen"."light(measurement)" WHERE time > now() - 6h GROUP BY time(1000s);
  return climateModel.query(query)
}

module.exports.climateModel = climateModel;
module.exports.query = query;