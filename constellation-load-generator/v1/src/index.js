'use strict';

import 'dotenv/config';
import axios from 'axios'

import setInterceptors from './services/setInterceptors.js';
import { options } from '../test_script/test_script.js';

const script = options.script;
const VU_COUNT = options.vus;
const DURATION = options.duration;

const OUTPUT = process.env.OUTPUT;
const BUFFER_TIME = 10000;

let testID = 0;
let testRunning = true;
const results = [];

const logAxios = axios.create();

/**
 * Sends the formatted results to the output and empties the results buffer
 */
const logAndClearResults = () => {
  try {
    logAxios.post(OUTPUT, results);
    results.length = 0;
  } catch (e) {
    console.error(e);
  }
}

/**
 * Starts a timer for the duration of the test, sets testRunning to false upon
 * completion
 */
const startTimer = () => {
  setTimeout(() => {
    testRunning = false;
  }, DURATION);
}

/**
 * Starts an interval to perform logging based on the buffer time
 */
const startLogger = () => {
  return setInterval(() => {
    logAndClearResults();
  }, BUFFER_TIME);
}

/**
 * Runs the test defined in the test script using the testAxios client and
 * upon test resolution repeats that test so long as testRunning is true
 */
const runTest = () => {
  const currentTestID = testID;
  testID++;

  const test = {
    testID: currentTestID,
    startTime: Date.now(),
    calls: [],
  }

  const testAxios = axios.create();
  setInterceptors(testAxios, test.calls);

  return script(testAxios).finally(async () => {
    test.runtime = Date.now() - test.startTime;
    results.push(test);

    if (testRunning){
      return runTest();
    }
  });
}

/**
 * Starts the test
 */
const start = async () => {
  startTimer();
  const testLogger = startLogger();

  const promises = [];
  for (let i = 0; i < VU_COUNT; i++) {
    const promise = runTest();
    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    logAndClearResults();
    clearInterval(testLogger);
  });
};

start();
