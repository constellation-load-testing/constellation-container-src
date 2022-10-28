'use strict';

import 'dotenv/config';
import axios from 'axios';

const TARGET = process.env.TARGET;
const VU_COUNT = process.env.VUS;
const DURATION = process.env.DURATION;
let testRunning = true;

setTimeout(() => {
  testRunning = false;
}, DURATION);

(async () => {
  axios.interceptors.request.use(config => {
    config.metadata = { startTime: Date.now() };
    return config;
  }, error => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(response => {
    const startTime = response.config.metadata.startTime;
    const endTime = Date.now();

    response.config.metadata.endTime = endTime;
    response.duration = endTime - startTime;
    return response;
  }, error => {
    return Promise.reject(error);
  });

  const promises = [];
  const responses = [];
  const promiseGenerator = (TARGET) => {

    return axios.post(TARGET, { timeStamp: Date.now() })
                .then(async (response) => {
                  responses.push(response);

                  await new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                  });

                  if (testRunning){
                    return promiseGenerator(TARGET);
                  }
                });
  }

  for (let i = 0; i < VU_COUNT; i++) {
    const promise = promiseGenerator(TARGET);
    promises.push(promise);
  }

  Promise.all(promises).then((results) => {
    const sum = responses.map(response => response.duration)
      .reduce((a, b) => a + b, 0);
    const avg = (sum / responses.length) || 0;
    console.log({ responses: responses.length });
    console.log(responses.map(response => response.duration))
    console.log({ avg });
  });
})();

