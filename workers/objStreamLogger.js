const { Transform } = require('stream');
const chalk = require('chalk');
const format = require('date-fns/format');

function leftPad(str, length = 20){
  return `${' '.repeat(Math.max(length - str.length, 0))}${str}`;
}

function rightPad(str, length = 20){
  return `${str}${' '.repeat(Math.max(length - str.length, 0))}`;
}

module.exports = () => {
  return new Transform({
    objectMode: true,
    write(obj, encoding, done){

      for(let prop in obj) {
        if(prop === "timestamp") {
	        console.log(`${chalk.dim(rightPad(prop, 11))} ${chalk.gray(":")} ${rightPad(format(obj[prop], 'dddd HH:mm:ss'))}`);
        } else {
          console.log(`${chalk.dim(rightPad(prop, 11))} ${chalk.gray(":")} ${rightPad(obj[prop])}`);
        }
      }

      //divider
      console.log(chalk.gray("-".repeat(35)));
      this.push(obj);
      done();
    }    
  })
};