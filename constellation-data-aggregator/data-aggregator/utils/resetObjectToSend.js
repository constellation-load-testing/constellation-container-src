function resetObjectToSend() {
  return {
    totalRequests: 0,
    totalErrors: 0,
    totalTests: 0,
    totalRuntime: 0,
    averageTestLatency: 0,
		totalCallRuntime: 0,
  };
}

module.exports = resetObjectToSend;
