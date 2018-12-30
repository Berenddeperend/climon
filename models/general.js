const Influx = require('influx');

const baseInfluxInstance = new Influx.InfluxDB({ host: "localhost" });

const listDataBases = () => {
  return new Promise(resolve => {
    baseInfluxInstance.getDatabaseNames()
      .then(dbNames => {
        resolve(dbNames.filter(dbName => dbName !== '_internal')); //all without _internal
      });
  })
}

const getDataBaseModel = (dbName) => {
  return new Promise((resolve, reject) => {
    listDataBases()
      .then(dbNames => {
        if(!dbNames.includes(dbName)) {
          reject(new Error(`Database '${dbName}' wasn't found.`))
        } else {
          resolve(new Influx.InfluxDB({ host: "localhost", database: dbName})); 
        }
      });
  });
}



const initDb = (dbName) => {
  return new Promise((resolve, reject) => {
    listDataBases()
      .then(dbNames => {
        if(!dbNames.includes(dbName)) {
          baseInfluxInstance.createDatabase(dbName).then(()=> {
            resolve(getDataBaseModel(dbName));
          });
        } else {
          resolve(getDataBaseModel(dbName)); 
        } 
      });
  });
}

const deleteDb = (dbName) => {
  return new Promise((resolve, reject) => {
    baseInfluxInstance.dropDatabase(dbName)
      .then(resolve);
  });
}

module.exports.listDataBases = listDataBases;
module.exports.baseInfluxInstance = baseInfluxInstance;
module.exports.initDb = initDb;
module.exports.getDataBaseModel = getDataBaseModel;
module.exports.deleteDb = deleteDb;