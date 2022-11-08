const resetObjectToSend = require("./resetObjectToSend");
const region = process.env.REGION
function createAggregateObject(dataArr, region) {
  const aggregateObject = resetObjectToSend();
  dataArr.forEach( objectToAggregate => {
		// console.log(objectToAggregate)
		data = JSON.parse(objectToAggregate.data)
    aggregateObject.totalTests += data.totalTests;
    aggregateObject.totalRuntime += data.totalRuntime;
    aggregateObject.averageRuntime = aggregateObject.totalRuntime / aggregateObject.totalTests;
  });
	const returnObject = {}
	returnObject[region] = aggregateObject
	return returnObject
}

module.exports = createAggregateObject;
