'use strict';

let callCounter = 0;

/**
 * Assigns the axios interceptor functions to given axios instance
 *
 * @param {AxiosInstance} axios
 * @param {array} results
 */
const setInterceptors = (axios, results) => {
  axios.interceptors.request.use(config => {
    const { headers, method, url, data } = config;
    config.metadata = {
      callID: callCounter,
      request: {headers, method, url, data},
      startTime: Date.now(),
      resultIndex: results.length - 1
    };
    callCounter++;

    return config;
  }, error => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(response => {
    const metadata = response.config.metadata;
    const startTime = metadata.startTime;
    const endTime = Date.now();

    metadata.endTime = endTime;
    metadata.latency = endTime - startTime;

    const { callID, request, latency } = metadata;
    const { status, statusText, headers, data } = response;
    response = {status, statusText, headers, data};

    results.push({ callID, request, response, latency });

    return response;
  }, error => {
    return Promise.reject(error);
  });
};

export default setInterceptors;
