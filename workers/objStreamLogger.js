const { Writable } = require('stream');

module.exports = () => {
  return new Writable({
    objectMode: true,
    write(obj, encoding, done){
      console.log(obj);

      // for(let prop in obj) {
      //   console.log(prop);
      // }
      // console.log('---')

      done();
    }    
  })
};