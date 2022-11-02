'use strict';

import 'dotenv/config';
import axios from 'axios'

import setInterceptors from './services/setInterceptors.js';
import { config } from './test_config.js';

const script = config.script;
const VU_COUNT = config.vus;
const DURATION = config.duration;

const OUTPUT = process.env.OUTPUT;
const BUFFER_TIME = 10000;

let testID = 0;
let testRunning = true;
const results = [];

const logAxios = axios.create();

/**
 * Sends the formatted results to the output and empties the results buffer
 */
const logAndClearResults = async () => {
  try {
    console.log(`Sending ${results.length} tests to ${OUTPUT}...`);
    await logAxios.post(OUTPUT, results);
    results.length = 0;

    console.log("Log sent, buffer cleared");
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
 *
 * @param {AxiosInstance} userAxios
 * @returns promise to be tracked for final log when settled
 */
 const runTest = (userAxios) => {
  const currentTestID = testID;
  testID++;

  const test = {
    testID: currentTestID,
    startTime: Date.now(),
    calls: [],
  }

  const clearInterceptors = setInterceptors(userAxios, test.calls);

  return script(userAxios).finally(async () => {
    test.runtime = Date.now() - test.startTime;
    results.push(test);

    clearInterceptors();

    if (testRunning){
      return runTest(userAxios);
    }
  });
}

/**
 * Starts the test
 */
const startTest = async () => {
  startTimer();
  const testLogger = startLogger();

  const promises = [];
  for (let i = 0; i < VU_COUNT; i++) {
    const userAxios = axios.create();
    const promise = runTest(userAxios);
    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    logAndClearResults();
    clearInterval(testLogger);
    console.log("Test Series Complete");
  });
};

startTest();