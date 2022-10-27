const getCache = require('./db/dbfunctions/db').getCache;
const emptyCache = require('./db/dbfunctions/db').emptyCache;
setInterval(async () => {
  try {
    const dataArr = await getCache()
    await emptyCache()
    const aggregateObject = createAggregateObject(dataArr);
    
    // send aggregate object to timestream
  } catch (e) {
    console.log(e);
  }
}, 10000);