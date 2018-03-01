const { Transform } = require('stream');

const types = {
  'temperature': 'Number',
  'light': 'Number',
  'moist': 'Number',
  'location': 'String'
};

module.exports = () => {
  return new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      this.push(objectify(chunk));
      callback();
    }
  })
};

//remember, don't use this function on wahmen
function objectify(chunk){
  return chunk
  .toString()
  .split("&")
  .reduce((acc, current, i) => {
    let [key, value] = current.split("=");
    
    if (types[key] === "Number") {
      mapNumberToArray(acc, key, value);
    }
    if (types[key] === "String") {
      acc[key] = value;
    }
    return acc;
  }, {
    timestamp: Date.now()
  });
}

function mapNumberToArray(collection, key, value) {
  if(collection[key]) {
    collection[key].push(Number(value));
  }
  else {
    collection[key] = [Number(value)];
  }
}