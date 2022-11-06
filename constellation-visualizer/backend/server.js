// create express server on port 3002
const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
app.use(cors());
const {TimestreamQueryClient, QueryCommand} = require("@aws-sdk/client-timestream-query");
const {TimestreamWriteClient, ListTablesCommand} = require("@aws-sdk/client-timestream-write");
const writeClient = new TimestreamWriteClient({region: "us-west-2"});
const queryClient = new TimestreamQueryClient({region: "us-west-2"});
app.use(express.static(__dirname.concat('/build')));
// takes in a list of region tables and returns an object with all the formated data from each table
// this is then sent to the frontend to be displayed
async function writeData(regions) {
	const regionObject = {}
	for (let i = 0; i < regions.length; i++) {
		let region = regions[i];
		const getTests = `SELECT * FROM \"constellation-timestream-db\".\"${region}-tests\" ORDER BY time DESC`;
		const getCalls = `SELECT * FROM \"constellation-timestream-db\".\"${region}-calls\" ORDER BY time DESC`;
		const testsResponse = await queryClient.send(new QueryCommand({QueryString: getTests}));
		const callsResponse = await queryClient.send(new QueryCommand({QueryString: getCalls}));
    console.log(callsResponse.Rows[5].Data[3].ScalarValue);
    const formatedTests = testsResponse.Rows.map((row) => {
      return {
        time: row.Data[2].ScalarValue.split(' ')[1],
        runtime: row.Data[3].ScalarValue,
      }
    })
    const rawFormatedCalls = callsResponse.Rows.map((row) => {
      return {
        url: row.Data[3].ScalarValue,
        status: row.Data[5].ScalarValue,
      }
    })
    const formatedCalls = {};
    rawFormatedCalls.forEach((call) => {
      formatedCalls[call.url] = formatedCalls[call.url] || {};
      formatedCalls[call.url][call.status] = formatedCalls[call.url][call.status] || 0;
      formatedCalls[call.url][call.status]++;
    })
		regionObject[region] = {
      tests: formatedTests,
      calls: formatedCalls,
    }
	}
	return regionObject
}

		// const formatedResponse = response.Rows.map(row => {
		// 	const [year, time] = row.Data[2].ScalarValue.split(' ');
		// 	return {
		// 		"year": year,
		// 		"time": time.split('.')[0],
		// 		"averageLatency": JSON.parse(row.Data[3].ScalarValue)[region].averageCallLatency,
		// 		"totalErrors": JSON.parse(row.Data[3].ScalarValue)[region].totalErrors
		// 	}
		// });

// server static files
app.get('/', (req, res) => {
	res.sendFile('../build/index.html');
});

// create a GET route
app.get('/data', async (req, res) => {
	const params = {
		DatabaseName: "constellation-timestream-db",
	};
	const command = new ListTablesCommand(params);

	const regionsRaw = await writeClient.send(command)
	const regionsWithDuplicates = regionsRaw.Tables.map((region) => {
		return region.TableName.split(/(\-calls|-tests)/)[0]
	})
  const regions = ((regions) => {
    const seen = {};
    const cleanedRegions = [];
    regions.forEach((region) => {
      if (!seen[region]) {
        cleanedRegions.push(region);
        seen[region] = true;
      }
    });
    return cleanedRegions;
  })(regionsWithDuplicates)

	const regionObject = await writeData(regions)
	regionObject["regions"] = regions;
	res.send(regionObject);
})

// start express server on port 3002
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
