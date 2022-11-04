function createCallsArray(dataArray) {
  const testsArray = [];
  dataArray.forEach((dataObj) => {
    const parsedData = JSON.parse(dataObj.data);
    const calls = parsedData.calls;
    calls.forEach((call) => {
      console.log(call)
      let timestreamObj = {
          Dimensions: [
            {
              Name: 'call_id',
              Value: `${call.callID}`
            },
            {
              Name: 'method',
              Value: `${call.request.method}`
            },
            {
              Name: 'url',
              Value: `${call.request.url}`
            },
            {
              Name: 'status',
              Value: `${call.response.status}`
            },
            {
              Name: 'statusText',
              Value: `${call.response.statusText}`
            },
            {
              Name: 'dataSize',
              Value: `${call.response.dataSize}`
            },
          ],
          MeasureName: 'latency',
          MeasureValue: `${call.latency}`, 
          MeasureValueType: 'VARCHAR',
          Time: `${Date.now()}`,
          TimeUnit: 'MILLISECONDS'
        }
      testsArray.push(timestreamObj);
    })
  })
  return testsArray;
}

module.exports = createCallsArray;
