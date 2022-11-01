const resetObjectToSend = require("./resetObjectToSend");
const region = process.argv[process.argv.length - 1]
function createAggregateObject(dataArr, region) {
  const aggregateObject = resetObjectToSend();
  dataArr.forEach( objectToAggregate => {
		data = JSON.parse(objectToAggregate.data)
    aggregateObject.totalRequests += data.totalRequests;
    aggregateObject.totalErrors += data.totalErrors;
    aggregateObject.totalTests += data.totalTests;
    aggregateObject.totalRuntime += data.totalRuntime;
		aggregateObject.totalCallRuntime += data.totalCallRuntime;
		aggregateObject.totalRequests += data.totalRequests;
		aggregateObject.averageCallLatency = aggregateObject.totalCallRuntime / aggregateObject.totalRequests;
    // aggregateObject.averageTestLatency = aggregateObject.totalRuntime / aggregateObject.totalTests;
  });
	const returnObject = {}
	returnObject[region] = aggregateObject
	return returnObject
}

module.exports = createAggregateObject;
