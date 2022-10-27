const updateObjectToSend = require('./updateObjectToSend');
function reqObjectParser(testArr, objectToSend) {
  testArr.forEach(test => {
    updateObjectToSend(test, objectToSend);
  });
}

module.exports = reqObjectParser;