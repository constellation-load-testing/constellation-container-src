'use strict';

import 'dotenv/config';
import axios from 'axios'

import setInterceptors from './services/setInterceptors.js';
import test_script, { options } from '../test_script/test_script.js';

// const TARGET = process.env.TARGET;
const VU_COUNT = options.vus;
const DURATION = options.duration;

let testRunning = true;

setTimeout(() => {
  testRunning = false;
}, DURATION);

(async () => {
  const results = {};
  setInterceptors(axios);

  let tests = 0;
  const promises = [];
  const promiseGenerator = () => {
    const currentTest = tests;
    tests++
    const startTime = Date.now();

    return test_script(axios).then(async () => {
      const endTime = Date.now();
      results[currentTest] = { runtime: endTime - startTime };

      if (testRunning){
        return promiseGenerator();
      }
    });
  }

  for (let i = 0; i < VU_COUNT; i++) {
    const promise = promiseGenerator();
    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    console.log(results);
    // const sum = responses.map(response => response.duration)
    //   .reduce((a, b) => a + b, 0);
    // const avg = (sum / responses.length) || 0;
    // console.log({ responses: responses.length });
    // console.log(responses.map(response => response.duration))
    // console.log({ avg });
  });
})();


/*
testID: {
  runtime: int,
  calls: [
    { callID: int, request: request, response: response, latency: int },
    ...
  ]
}
*/
