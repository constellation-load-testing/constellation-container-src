function updateErrorAndRequests (test, objectToSend) {
  test.calls.forEach( call => {
    objectToSend.totalRequests++;
    if (call.response.statusCode >= 400) {
      objectToSend.totalErrors++;
    }
  });
}

module.exports = updateErrorAndRequests;