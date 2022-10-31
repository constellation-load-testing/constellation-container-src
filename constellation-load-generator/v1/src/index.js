'use strict';

import 'dotenv/config';
import axios from 'axios'

import setInterceptors from './services/setInterceptors.js';
import { options } from '../test_script/test_script.js';

const test = options.test;
const VU_COUNT = options.vus;
const DURATION = options.duration;

const OUTPUT = process.env.OUTPUT;
const BUFFER_TIME = 4000;

const testID = 0;
const startTime = Date.now();
const results = [];
let testRunning = true;

const testAxios = axios.create();
const logAxios = axios.create();
setInterceptors(testAxios, results);

const formatResults = () => {
  return {
    [testID]: {
      runtime: Date.now() - startTime,
      calls: results
    }
  }
}

const formatAndLogResults = () => {
  try {
    logAxios.post(OUTPUT, formatResults());
    results.length = 0;
  } catch (e) {
    console.error(e);
  }
}

const startTimer = () => {
  setTimeout(() => {
    testRunning = false;
  }, DURATION);
}

const startLogger = () => {
  return setInterval(() => {
    formatAndLogResults();
  }, BUFFER_TIME);
}

const runTest = () => {
  return test(testAxios).then(async () => {
    if (testRunning){
      return runTest();
    }
  });
}

const start = async () => {
  startTimer();
  const testLogger = startLogger();

  const promises = [];
  for (let i = 0; i < VU_COUNT; i++) {
    const promise = runTest();
    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    formatAndLogResults();
    clearInterval(testLogger);
  });
};

start();

/*
testID: {
  runtime: int,
  calls: [
    { callID: int, request: request, response: response, latency: int },
    ...
  ]
}
*/

