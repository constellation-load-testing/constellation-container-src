const getRegions = require('./getRegions');
const regions = getRegions();
const { TimestreamWrite } = require("@aws-sdk/client-timestream-write");
const { CreateDatabaseCommand } = require("@aws-sdk/client-timestream-write");
const { CreateTableCommand } = require("@aws-sdk/client-timestream-write");

const createTimestreamDB = async () => {
	const timestreamWrite = new TimestreamWrite({ region: 'us-east-1' });
	const params = {
		DatabaseName: "constellation-timestream-db",
	};
	try {
		const data = await timestreamWrite.send(new CreateDatabaseCommand(params));
		regions.forEach(async (region) => {
			const createTests = {
				DatabaseName: "constellation-timestream-db",
				TableName: `${region}-tests`,
				RetentionProperties: {
					MemoryStoreRetentionPeriodInHours: 24,
					MagneticStoreRetentionPeriodInDays: 7
				}
			};
			const createCalls = {
				DatabaseName: "constellation-timestream-db",
				TableName: `${region}-calls`,
				RetentionProperties: {
					MemoryStoreRetentionPeriodInHours: 24,
					MagneticStoreRetentionPeriodInDays: 7
				}
			};
			try {
				const dataTests = await timestreamWrite.send(new CreateTableCommand(createTests));
				const dataCalls = await timestreamWrite.send(new CreateTableCommand(createCalls));
				console.log(data1);
				console.log(data2);
			} catch (err) {
				console.log("Error", err);
			}
		});
	} catch (err) {
		console.log("Error", err);
	}
}

module.exports = createTimestreamDB;
