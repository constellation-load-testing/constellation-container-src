const getItemsBetweenTimeDurationInCache = require("../db/dbfunctions/db").getItemsBetweenTimeDurationInCache;
const { deleteItemsBeforeTimeDurationInCache } = require("../db/dbfunctions/db");
const emptyCache = require('../db/dbfunctions/db').emptyCache;
const writeToTimeStream = require('./writeToTimeStream');
const createTestsArray = require('../utils/createTestsArray');
const createCallsArray = require('../utils/createCallsArray');

const INTERVAL = 2000;
let counter = 0;
let bool = false;

function intervalSendToTimestream() {
	const region = process.env.REGION;
	const aggInterval = setInterval(async () => {
		try {
      console.log("Normal operation and getting items from cache");
			const timestamp = Date.now();
			const dataArr = await getItemsBetweenTimeDurationInCache(timestamp, INTERVAL)
			await deleteItemsBeforeTimeDurationInCache(timestamp, INTERVAL);
			if (dataArr.length > 0) { 
			console.log("object sent")
      const testsArray = createTestsArray(dataArr);
      const callsArray = createCallsArray(dataArr);
        console.log("error ?")
        console.log(callsArray.length, testsArray.length);
				writeToTimeStream(testsArray, callsArray, region);
				bool = true;
			} else if (counter === 3) {
        console.log("Have not received any data in 3 counters, clearing cache");
				clearInterval(aggInterval);
				await emptyCache();
			} else if (bool) {
				counter++
			}
		} catch (e) {
			// console.log(e);
		}
	}, INTERVAL);
}
module.exports = intervalSendToTimestream;
