const { Transform } = require('stream');

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
    let values = current.split("=");
    acc[values[0]] = values[1];

    return acc;
  }, {});
}