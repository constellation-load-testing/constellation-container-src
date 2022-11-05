const {
  TimestreamWriteClient,
  WriteRecordsCommand,
} = require("@aws-sdk/client-timestream-write");

const HOME_REGION = process.env.HOME_REGION || "us-west-2";

async function writeToTimeStream(testsArray, callsArray, region) {
	const client = new TimestreamWriteClient({region: HOME_REGION});
  let arrayToWrite = [];
  try {
    for (let i = 1; i <= testsArray.length; i++) {
      let testObj = testsArray[i];
      arrayToWrite.push(testObj);
      if (arrayToWrite.length === 100 || i === testsArray.length) {
        const params = {
          DatabaseName: 'constellation-timestream-db',
          TableName: `${region}-tests`,
          Records: arrayToWrite,
        };
        const command = new WriteRecordsCommand(params);
        const testsResponse = await client.send(command);
        arrayToWrite = [];
      }
    };
    for (let i = 1; i <= callsArray.length; i++) {
      let callObj = callsArray[i];
      arrayToWrite.push(callObj);
      if (arrayToWrite.length === 100 || i === testsArray.length) {
        const params = {
          DatabaseName: 'constellation-timestream-db',
          TableName: `${region}-calls`,
          Records: arrayToWrite,
        };
        const command = new WriteRecordsCommand(params);
        const callsResponse = await client.send(command);
        arrayToWrite = [];
      }
    };
  } catch (err) {
    console.error(err);
  }
}

module.exports = writeToTimeStream;
