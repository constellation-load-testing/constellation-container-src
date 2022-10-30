'use strict';

import 'dotenv/config';
import axios from 'axios'

import setInterceptors from './services/setInterceptors.js';
import { options } from '../test_script/test_script.js';

const call = options.call;
const VU_COUNT = options.vus;
const DURATION = options.duration;

const OUTPUT = process.env.OUTPUT;
const BUFFER_TIME = 4000;

let testRunning = true;

const testAxios = axios.create();
const logAxios = axios.create();

setTimeout(() => {
  testRunning = false;
}, DURATION);

(async () => {
  const testID = 0;
  const startTime = Date.now();
  let results = [];
  setInterceptors(testAxios, results);

  const testReporter = setInterval(() => {
    const test = {
      [testID]: {
        runtime: Date.now() - startTime,
        calls: results
      }
    }

    logAxios.post(OUTPUT, test);
    results.length = 0;
  }, BUFFER_TIME);

  const promises = [];
  const promiseGenerator = () => {
    return call(testAxios).then(async () => {
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
    const test = {
      [testID]: {
        runtime: Date.now() - startTime,
        calls: results
      }
    }

    logAxios.post(OUTPUT, test);
    clearInterval(testReporter);
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

