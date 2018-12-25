const Influx = require('influx');

const listDataBases = () => {
  return new Promise(resolve => {
    const influx = new Influx.InfluxDB({ host: "localhost" });
    influx.getDatabaseNames().then(dbNames => { 
      resolve(dbNames)
    });
  })
}

module.exports.listDataBases = listDataBases;