//takes a promise, if rejected, try again a few times

module.exports = function(fn) {
  const times = 3;
  currentTry = 0;
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve())
      .catch();
  })
}