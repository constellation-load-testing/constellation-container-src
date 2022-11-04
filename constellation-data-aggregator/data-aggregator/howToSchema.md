P: I need to take in the data from the lg and sepperate the calls from the tests and then aggregate it into the sqlite database, this is then sensibly aggreagated agian for a 10 second time window and sent to either the call database or the tests database

E: [
  {
    testID: int,
    startTime: int,
    runtime: int,
    calls: [
      {
        callID: int, 
        request: {method, url}, 
        response: {status, statusText, dataSize}, 
        latency: int
      },
      ...
    ],
  },
  ...
]

A: - first, take in the data and in the object 
- within the fillObjectToSend, make sure that every call has the test id 
- then concat objectToSend.calls with the test.calls

- in the setInterval i need to send in batches to the calls and tests with records i presume
- that means i need to delete the createAggregateObject method and work out the logic in new methods 
- 

notes: it seems like because i need all the data I can get from the test object I dont really see a reason to change it much to send it sqlite. All i really need to do is just add the testID to the calls object and I can sepperate them later. actually. It seems like maybe I can just send the call object to the database when I get them then aggregate the test objects later? 

If I were to send calls to the db first and formost then I would not need the fill object to send method, or at least rename it to send calls 

nevermind, what i need to do is keep the sqlite and batch write with the setIhnterval
