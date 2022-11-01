const getItemsBetweenTimeDurationInCache = require("../db/dbfunctions/db").getItemsBetweenTimeDurationInCache;
const { deleteItemsBeforeTimeDurationInCache } = require("../db/dbfunctions/db");
const emptyCache = require('../db/dbfunctions/db').emptyCache;

const writeToTimeStream = require('./writeToTimeStream');

const createAggregateObject = require('../utils/createAggregateObject');

const INTERVAL = 5000;
let counter = 0;
let bool = false;

function intervalSendToTimestream() {
	const region = process.argv[process.argv.length - 1];
	const aggInterval = setInterval(async () => {
		try {
			console.log("yup")
			const timestamp = Date.now();
			const dataArr = await getItemsBetweenTimeDurationInCache(timestamp, INTERVAL)
			await deleteItemsBeforeTimeDurationInCache(timestamp, INTERVAL);
			const aggregateObject = createAggregateObject(dataArr, region);
			console.log(aggregateObject)
			if (aggregateObject[Object.keys(aggregateObject)[0]].totalTests > 0) {
				writeToTimeStream(aggregateObject, region);
				bool = true;
			} else if (counter === 3) {
				console.log("nope")
				clearInterval(aggInterval);
				await emptyCache();
			} else if (bool) {
				counter++
			}
		} catch (e) {
			console.log(e);
		}
	}, INTERVAL);
}

module.exports = intervalSendToTimestream;
