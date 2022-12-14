"use strict";

import "dotenv/config";
import axios from "axios";

import setInterceptors from "./services/setInterceptors.js";
import { script } from "./test_config.js";

const VU_COUNT = Number(process.env.VU);
const DURATION = Number(process.env.DURATION);
console.log({ VU: VU_COUNT, DURATION });

const OUTPUT =
  `${process.env.OUTPUT}/aggregator` || "http://localhost:3003/aggregator";
const BUFFER_TIME = 10000;

let testID = 1;
let testRunning = true;
const successes = [];
const errors = [];

const logAxios = axios.create();

/**
 * Starts a timer for the duration of the test, sets testRunning to false upon
 * completion
 */
const startTimer = () => {
  setTimeout(() => {
    testRunning = false;
  }, DURATION);
};

/**
 * Starts an interval to perform logging based on the buffer time
 */
const startLogger = () => {
  return setInterval(() => {
    logAndClearResults();
  }, BUFFER_TIME);
};

/**
 * Store the test in either the successes or errors array
 * @param {object} test
 */
const checkAndStoreTest = (test) => {
  const error = test.calls.some(call => {
    return call.response.status < 0 || call.response.status >= 400;
  })

  if (error) {
    errors.push(test);
  } else {
    successes.push(test);
  }
};

/**
 * Sends the formatted results to the output and empties the results buffer
 */
const logAndClearResults = async () => {
  const results = [...successes, ...errors];
  try {
    console.log(`Sending ${results.length} tests to ${OUTPUT}...`);
    await logAxios.post(OUTPUT, results);
    successes.length = 0;
    errors.length = 0;

    console.log("Log sent, buffer cleared");
  } catch (e) {
    console.error(e);
  }
};

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
  };

  const clearInterceptors = setInterceptors(userAxios, test);

  return script(userAxios).finally(async () => {
    test.runtime = Date.now() - test.startTime;
    checkAndStoreTest(test);

    clearInterceptors();

    if (testRunning) {
      return runTest(userAxios);
    }
  });
};

/**
 * Starts the test
 */
const startTest = async () => {
  console.log("Test Series Started");
  startTimer();
  const testLogger = startLogger();

  const promises = [];
  for (let i = 0; i < VU_COUNT; i++) {
    const userAxios = axios.create();
    const promise = runTest(userAxios);
    promises.push(promise);
  }

  Promise.all(promises).then(async () => {
    clearInterval(testLogger);
    await logAndClearResults();
    console.log("Test Series Complete");
  });
};

startTest();
