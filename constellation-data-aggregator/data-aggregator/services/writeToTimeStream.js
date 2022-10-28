const {TimestreamWriteClient, WriteRecordsCommand} = require("@aws-sdk/client-timestream-write");

const client = new TimestreamWriteClient({region: 'us-east-1'});

async function writeToTimeStream(input) {
	try {
		const params = {
			DatabaseName: '',
			TableName: 'aggregation-table',
			Records: [
				{
					Dimensions: [
						{
							Name: 'test',
							Value: 'test'
						}
					],
					MeasureName: 'ten second average',
					MeasureValue: JSON.stringify(input),
					MeasureValueType: 'VARCHAR',
					Time: `${Date.now()}`,
					TimeUnit: 'MILLISECONDS'
				},
			]
		};
		const command = new WriteRecordsCommand(params);
		const response = await client.send(command);
		console.log(response);
	} catch (err) {
		console.error(err);
	}
}

module.exports = writeToTimeStream;
