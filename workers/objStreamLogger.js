const { Transform } = require('stream');
const chalk = require('chalk');

leftPad = function(str, length = 20){
  return `${' '.repeat(Math.max(length - str.length, 0))}${str}`;
}

rightPad = function(str, length = 20){
  return `${str}${' '.repeat(Math.max(length - str.length, 0))}`;
}



module.exports = () => {
  return new Transform({
    objectMode: true,
    write(obj, encoding, done){
      // console.log(obj);

      for(let prop in obj) {
        console.log(`${chalk.green(rightPad(prop, 11))} ${chalk.gray(":")} ${rightPad(obj[prop])}`);
      }
      console.log(chalk.gray("-".repeat(35)));
      this.push(obj);
      done();
    }    
  })
};