const { Transform } = require('stream');

module.exports = () => {
  return new Transform({
    objectMode: true,
    write(obj, encoding, done){
      console.log(obj);

      // for(let prop in obj) {
      //   console.log(prop);
      // }
      // console.log('---')
      this.push(obj);
      done();
    }    
  })
};