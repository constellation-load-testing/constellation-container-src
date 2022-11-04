const {
  TimestreamWriteClient,
  WriteRecordsCommand,
} = require("@aws-sdk/client-timestream-write");

const HOME_REGION = process.env.HOME_REGION || "us-west-2";

async function writeToTimeStream(testsArray, callsArray, region) {
  console.log(callsArray[0].Dimensions[0])
	try {
		const client = new TimestreamWriteClient({region: 'us-west-2'});
		const writeToTests = {
			DatabaseName: 'constellation-timestream-db',
			TableName: `${region}-tests`,
			Records: testsArray
			
		};
		const writeToCalls = {
			DatabaseName: 'constellation-timestream-db',
			TableName: `${region}-calls`,
			Records: callsArray
    };
		const testsCommand = new WriteRecordsCommand(writeToTests);
		const testsResponse = await client.send(testsCommand);
		const callsCommand = new WriteRecordsCommand(writeToCalls);
		const callsResponse = await client.send(callsCommand);
		console.log(callsResponse);
	} catch (err) {
		console.error(err);
	}
}

module.exports = writeToTimeStream;
