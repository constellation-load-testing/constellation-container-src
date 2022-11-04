const {
  TimestreamWriteClient,
  WriteRecordsCommand,
} = require("@aws-sdk/client-timestream-write");

const HOME_REGION = process.env.HOME_REGION || "us-west-2";

async function writeToTimeStream(input, region) {
  try {
    const client = new TimestreamWriteClient({
      region: HOME_REGION,
    });
    console.log(`Writing to timestream DB in: ${HOME_REGION}`);
    console.log(typeof region);
    const params = {
      DatabaseName: "constellation-timestream-db",
      TableName: region,
      Records: [
        {
          Dimensions: [
            {
              Name: "test",
              Value: "test",
            },
          ],
          MeasureName: "ten second average",
          MeasureValue: JSON.stringify(input),
          MeasureValueType: "VARCHAR",
          Time: `${Date.now()}`,
          TimeUnit: "MILLISECONDS",
        },
      ],
    };
    const command = new WriteRecordsCommand(params);
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

module.exports = writeToTimeStream;
