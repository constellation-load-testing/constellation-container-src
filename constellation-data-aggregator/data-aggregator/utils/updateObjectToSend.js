const updateErrorAndRequests = require('./updateErrorAndRequests');
const updateRuntimeAndTests = require('./updateRuntimeAndTests');

function updateObjectToSend(test, objectToSend) {
  updateRuntimeAndTests(test, objectToSend);
  updateErrorAndRequests(test, objectToSend);
}

module.exports = updateObjectToSend;