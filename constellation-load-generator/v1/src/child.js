'use strict';

import axios from 'axios';
// import test_script from '../test_script/test_script';

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
    const response = await axios.get("http://mockbin.org/bin/a953bf53-c692-4114-8a9c-a6c84037414a?foo=bar&foo=baz");
    process.stdout.write(response.duration.toString());
    process.exitCode = 0;
  } catch (e) {
    process.exitCode = 1;
  }
})();


