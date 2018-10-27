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

const query = function() {
  // return climateModel.query(`
  //   select * from climon
  // `)
  // SELECT mean("light") AS "mean_light" FROM "climon"."autogen"."light(measurement)" WHERE time > now() - 6h GROUP BY time(1000s);
  return climateModel.query(`
    SELECT mean("light") AS "mean_light" FROM "climon"."autogen"."light(measurement)" WHERE time > now() - 6h GROUP BY time(1000s);
  `)
}


// influx.writePoints([
//   {
//     measurement: 'response_times',
//     tags: { host: os.hostname() },
//     fields: { duration, path: req.path },
//   }
// ]).then(() => {
//   return influx.query(`
//     select * from response_times
//     where host = ${Influx.escape.stringLit(os.hostname())}
//     order by time desc
//     limit 10
//   `)
// }).then(rows => {
//   rows.forEach(row => console.log(`A request to ${row.path} took ${row.duration}ms`))
// })


module.exports.climateModel = climateModel;
module.exports.query = query;