function updateErrorAndRequests (test, objectToSend) {
  test.calls.forEach( call => {
    objectToSend.totalRequests++;
    if (call.response.status >= 400) {
      objectToSend.totalErrors++;
    }
  });
}

module.exports = updateErrorAndRequests;
