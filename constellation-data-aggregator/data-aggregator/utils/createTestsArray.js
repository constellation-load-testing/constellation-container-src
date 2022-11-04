function createTestsArray(dataArray) {
  const testsArray = [];
  dataArray.forEach((dataObj) => {
    const parsedData = JSON.parse(dataObj.data);
    const test = parsedData.tests;
    test.forEach((test) => {
      let timestreamObj = {
          Dimensions: [
            {
              Name: 'test_id',
              Value: `${test.testID}`
            }
          ],
          MeasureName: 'runtime',
          MeasureValue: `${test.runtime}`,
          MeasureValueType: 'VARCHAR',
          Time: `${Date.now()}`,
          TimeUnit: 'MILLISECONDS'
        }
      testsArray.push(timestreamObj);
    })
  })
  return testsArray;
}

module.exports = createTestsArray;
