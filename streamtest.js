const Readable = require('stream').Readable;
const Transform = require('stream').Transform;

const myReadable = new Readable({
  read(size){
    setTimeout(() => {
      this.isAlive = false;
    }, 2000)
  }
});

myReadable.isAlive = true;
myReadable.iteration = 0;

const myTransform = new Transform({
  transform(chunk, encoding, callback){
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

setInterval(() => {
  if (myReadable.isAlive) {
    myReadable.push(`Nummer ${myReadable.iteration++} \n`);
  }
}, 100);


myReadable.pipe(myTransform).pipe(process.stdout);