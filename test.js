function trySomething(arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(arg) {
        resolve('het is gelukt!');
      } else {
        reject('nee hoor')
      }
    }, 1000)

  });
}

trySomething(true)
  .then(data => {
    console.log(data);
    return trySomething(true);
  }).then(data => {
    console.log(data);
    return trySomething(false);
  }).then(data => {
    console.log(data);
    return trySomething(true);
  }).then(data => {
    console.log(data);
    return trySomething(true);
  }).catch((omdat) => {
    console.log(omdat)
  });