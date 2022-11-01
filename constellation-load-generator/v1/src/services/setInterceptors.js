'use strict';

let callCounter = 0;

/**
 * Gets data from axios metadata and response to construct the call log
 *
 * @param {AxiosResponse} response
 * @returns call log object
 */
const processResponse = (response) => {
  const metadata = response.config.metadata;
  const startTime = metadata.startTime;
  const endTime = Date.now();

  const latency = endTime - startTime;
  const { callID, request } = metadata;

  const { status, statusText, headers, data } = response;
  response = {status, statusText, headers, data};

  return { callID, request, response, latency }
}

/**
 * Assigns the axios interceptor functions to given axios instance
 *
 * @param {AxiosInstance} axios
 * @param {array} calls
 */
const setInterceptors = (axios, calls) => {
  axios.interceptors.request.use(config => {
    const { headers, method, url, data } = config;
    config.metadata = {
      callID: callCounter,
      request: {headers, method, url, data},
      startTime: Date.now(),
      resultIndex: calls.length - 1
    };
    callCounter++;

    return config;
  }, error => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(response => {
    calls.push(processResponse(response));
    return response;
  }, error => {
    calls.push(processResponse(error.response));
    return error;
  });
};

export default setInterceptors;
