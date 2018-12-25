
/*
This will generate an array with an entry for every 'field' it sees.
Since it will eventually be saved with a 'writepoints' method, generating one array is fine.
*/

const { Transform } = require('stream');

module.exports = () => {
  return new Transform({
    objectMode: true,
    transform(chunk, encoding, done) {
      this.push(objectify(chunk));
      done();
    }
  })
};


//remember, don't use this function on wahmen
function objectify(chunk){
  // const timestamp = Date.now();
  let tags = {};
  let fields = []
  let measurement = "Other";
  let sensorCounter = {};

  chunk.toString().split('&').map(keyValuePair => {
    let [key, value] = keyValuePair.split("=");
    let [dataType, primitiveType, keyName] = key.split("/");
    
    if(dataType == "tag") {
      if(primitiveType == "Number") value = Number(value);
      tags[keyName] = value;
    } else if (dataType == "field") {
      if(primitiveType == "Number") value = Number(value);
      fields.push({ [keyName]: value }) //es6 computed name property 
    } else if (dataType = "measurement") {
      measurement = value;
    } else {
      console.warn("entry not recognized!");
    }
   });


   const result = fields.map((field) => {
     return {
       measurement,
       fields: { ...field },
       tags: {
         ...tags,
         sensorId: getSensorIndex(field, sensorCounter)
       }
     }
   });

   return result;
}

function getSensorIndex(field, sensorCounter) {
  for (key in field) {
    if(sensorCounter.hasOwnProperty(key)) {
      sensorCounter[key] ++
    } else {
      sensorCounter[key] = 1;
    }
    return sensorCounter[key]
  }
}
