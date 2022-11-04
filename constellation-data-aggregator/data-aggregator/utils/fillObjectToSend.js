function fillObjectToSend(test, objectToSend) {
  objectToSend.totalTests += 1;
  objectToSend.tests.push(test);
	objectToSend.calls = objectToSend.calls.concat(test.calls.map(call => {
    call.testID = test.testID;
    return call;
  }))
}

module.exports = fillObjectToSend;
