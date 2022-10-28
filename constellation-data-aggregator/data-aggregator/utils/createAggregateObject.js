const resetObjectToSend = require("./resetObjectToSend");
function createAggregateObject(dataArr) {
  const aggregateObject = resetObjectToSend();
  console.log(aggregateObject)
  dataArr.forEach( objectToAggregate => {
		console.log(objectToAggregate.data)
		data = JSON.parse(objectToAggregate.data)
    aggregateObject.totalRequests += data.totalRequests;
    aggregateObject.totalErrors += data.totalErrors;
    aggregateObject.totalTests += data.totalTests;
    aggregateObject.totalRuntime += data.totalRuntime;
    aggregateObject.averageTestLatency = aggregateObject.totalRuntime / aggregateObject.totalTests;
  });
  return aggregateObject;
}

module.exports = createAggregateObject;
