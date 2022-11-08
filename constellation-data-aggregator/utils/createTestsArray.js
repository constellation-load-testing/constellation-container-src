const sanitizeStartTime = require('./sanitizeStartTime.js');
function createTestsArray(dataArray) {
  const testsArray = [];
  const seenTimes = {};
  dataArray.forEach((dataObj) => {
    const parsedData = JSON.parse(dataObj.data);
    const test = parsedData.tests;
    test.forEach((test, i) => {
      let timestreamObj = {
          Dimensions: [
            {
              Name: 'test_id',
              Value: `${test.testID}`
            }
          ],
          MeasureName: 'runtime',
          MeasureValue: `${test.runtime}`,
          MeasureValueType: 'DOUBLE',
          Time: `${sanitizeStartTime(test.startTime, seenTimes)}`,
          TimeUnit: 'MILLISECONDS'
        }
      testsArray.push(timestreamObj);
    })
  })
  return testsArray;
}

module.exports = createTestsArray;
