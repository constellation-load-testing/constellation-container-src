// test createCallsArray function
const createCallsArray = require('../utils/createCallsArray');
const assert = require('assert');

const exampleData = JSON.
stringify(
  {
    calls: [{
      callID: 1,
      request: {
        method: 'GET',
        url: 'http://localhost:3000'
      },
      response: {
        status: 200,
        statusText: 'OK',
        dataSize: 20
      },
      latency: 100
    }]
  }
);

const callsArgument = [{data: exampleData}];

describe('createCallsArray', () => {
  const calls = createCallsArray(callsArgument);
  it('should return an array of calls', () => {
    assert.equal(calls.length, 1);
  });
  it('should return an array of calls with the correct properties', () => {
    const d = calls[0].Dimensions
    assert.equal(d[0].Value, "1");
    assert.equal(d[1].Value, 'GET');
    assert.equal(d[2].Value, 'http://localhost:3000');
    assert.equal(d[3].Value, "200");
    assert.equal(d[4].Value, 'OK');
    assert.equal(d[5].Value, "20");
    assert.equal(calls[0].MeasureValue, 100);
  })
})
