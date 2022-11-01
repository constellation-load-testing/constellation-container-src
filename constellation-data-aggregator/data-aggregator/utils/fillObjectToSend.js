const fillErrorAndRequests = require('./fillErrorAndRequests');

function fillObjectToSend(test, objectToSend) {
	objectToSend.totalTests++;
	objectToSend.totalRuntime += test.runtime;
	objectToSend.totalCallRuntime += test.calls.reduce((acc, call) => acc + call.latency, 0);
	objectToSend.calls = test.calls;
	fillErrorAndRequests(test, objectToSend);
	objectToSend.averageRuntime = objectToSend.totalCallRuntime / objectToSend.totalRequests;
}

module.exports = fillObjectToSend;
