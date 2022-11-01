'use strict';

import axios from 'axios';

(async () => {
  axios.interceptors.request.use(config => {
    config.metadata = { startTime: new Date() };
    return config;
  }, error => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(response => {
    response.config.metadata.endTime = new Date();
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  }, error => {
    return Promise.reject(error);
  });

  try {
    const response = await axios.post("http://localhost:5000/target", {
      timeStamp: Date.now(),
    });
    process.stdout.write(response.duration.toString());
    process.exitCode = 0;
  } catch (e) {
    process.exitCode = 1;
  }

  // const promiseGenerator = (url) => {
  //   return axios.get(url, { timeStamp: Date.now() })
  //               .then(promiseGenerator(url));
  // }

  // const promises = [];
  // for (let i = 0; i < 500; i++) {
  //   const response = axios.post("http://localhost:5000/target", {
  //     timeStamp: Date.now(),
  //   });
  //   promises.push(response);
  // }

  // Promise.allSettled(promises).then(results => {
  //   const sum = results.map(response => response.value.duration)
  //     .reduce((a, b) => a + b, 0);
  //   const avg = (sum / results.length) || 0;
  //   console.log(results.map(response => response.value.duration))
  //   console.log(avg);
  // });
})();


