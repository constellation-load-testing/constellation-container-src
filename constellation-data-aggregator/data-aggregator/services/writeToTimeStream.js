const {TimestreamWriteClient, WriteRecordsCommand} = require("@aws-sdk/client-timestream-write");

const client = new TimestreamWriteClient({region: 'us-east-1'});

async function writeToTimeStream(input) {
	try {
    const command = new WriteRecordsCommand({
      DatabaseName: 'test',
      TableName: 'test',
    });
    const data = await client.send(command);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = writeToTimeStream;
