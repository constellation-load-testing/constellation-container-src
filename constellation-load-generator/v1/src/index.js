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

/**
 * Formats the buffered results to be sent to the output
 *
 * @returns results object formatted for the output
 */
const formatResults = () => {
  const currentTime = Date.now();

  return {
    [testID]: {
      runtime: currentTime - startTime,
      calls: results
    }
  }
}

/**
 * Sends the formatted results to the output and empties the results buffer
 */
const formatAndLogResults = () => {
  try {
    logAxios.post(OUTPUT, formatResults());
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
    formatAndLogResults();
  }, BUFFER_TIME);
}

/**
 * Runs the test defined in the test script using the testAxios client and
 * upon test resolution repeats that test so long as testRunning is true
 */
const runTest = () => {
  return test(testAxios).then(async () => {
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
    formatAndLogResults();
    clearInterval(testLogger);
  });
};

start();
