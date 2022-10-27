const resetObjectToSend = require("./resetObjectToSend");
function createAggregateObject(dataArr) {
  const aggregateObject = resetObjectToSend();
  dataArr.forEach( objectToAggregate => {
    aggregateObject.totalRequests += objectToAggregate.totalRequests;
    aggregateObject.totalErrors += objectToAggregate.totalErrors;
    aggregateObject.totalTests += objectToAggregate.totalTests;
    aggregateObject.totalRuntime += objectToAggregate.totalRuntime;
    aggregateObject.averageRuntime = aggregateObject.totalRuntime / aggregateObject.totalTests;
  });
  return aggregateObject;
}

module.exports = createAggregateObject;