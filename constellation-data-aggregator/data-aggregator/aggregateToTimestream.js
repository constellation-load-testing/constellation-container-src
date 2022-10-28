const INTERVAL = 5000;
const getItemsBetweenTimeDurationInCache = require("./db/dbfunctions/db").getItemsBetweenTimeDurationInCache;
const { deleteItemsBeforeTimeDurationInCache } = require("./db/dbfunctions/db");
const writeToTimeStream = require('./services/writeToTimeStream');
const createAggregateObject = require('./utils/createAggregateObject');
const getCache = require('./db/dbfunctions/db').getCache;
const emptyCache = require('./db/dbfunctions/db').emptyCache;
let counter = 0;
let bool = false;

const run = async () => {
  await new Promise((resolve, _) => {
    setTimeout(() => resolve(), 1000)
  })
  const aggInterval = setInterval(async () => {
    try {
      console.log("yup")
      const timestamp = Date.now();
      const dataArr = await getItemsBetweenTimeDurationInCache(timestamp, INTERVAL)
      await deleteItemsBeforeTimeDurationInCache(timestamp, INTERVAL);
      // console.log({lengthOfCache: (await getCache()).length})
      const aggregateObject = createAggregateObject(dataArr);
      if (aggregateObject.totalTests > 0) {
        writeToTimeStream(aggregateObject);
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

run()
