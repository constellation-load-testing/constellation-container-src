function updateRutimeAndTests(test, objectToSend) {
  objectToSend.totalTests++;
  objectToSend.totalRuntime += test.runtime;
  objectToSend.averageRuntime = objectToSend.totalRuntime / objectToSend.totalTests;
}

module.exports = updateRutimeAndTests;