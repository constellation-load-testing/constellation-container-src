const writeToTimeStream = require('./services/writeToTimeStream');

const getCache = require('./db/dbfunctions/db').getCache;
const emptyCache = require('./db/dbfunctions/db').emptyCache;
const createAggregateObject = require('./utils/createAggregateObject');
setInterval(async () => {
    console.log('running');
  try {
    const dataArr = await getCache()
    await emptyCache()
    const aggregateObject = createAggregateObject(dataArr);
    console.log(aggregateObject)
    writeToTimeStream(aggregateObject);
  } catch (e) {
    console.log(e);
  }
}, 5000);
