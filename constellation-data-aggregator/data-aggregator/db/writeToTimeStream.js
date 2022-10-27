const {TimestreamWriteClient, CreateTableCommand} = require('@aws-sdk/client-timestream-write');

const client = new TimestreamWriteClient({region: 'us-east-1'});

const command = new CreateDatabaseCommand({DatabaseName: 'test'});

async function writeToTimeStream() {
	try {
		const data = await client.send(command);
		console.log(data);
	} catch (err) {
		console.error(err);
	}
}

module.exports = writeToTimeStream;
