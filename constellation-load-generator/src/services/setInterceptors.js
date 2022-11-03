"use strict";

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

  let status, statusText, headers, data;
  if (response.code === "ECONNREFUSED") {
    status = response.errno;
    statusText = response.code;
  } else {
    ({ status, statusText, headers, data } = response);
  }

  response = { status, statusText, headers, data };

  return { callID, request, response, latency };
};

/**
 * Assigns the axios interceptor functions to given axios instance
 *
 * @param {AxiosInstance} axios
 * @param {array} calls
 * @returns function to remove interceptors from axios instance
 */
const setInterceptors = (axios, calls) => {
  let callCounter = 0;

  const requestInterceptor = axios.interceptors.request.use(
    (config) => {
      const { headers, method, url, data } = config;
      config.metadata = {
        callID: callCounter,
        request: { headers, method, url, data },
        startTime: Date.now(),
        resultIndex: calls.length - 1,
      };
      callCounter++;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const responseInterceptor = axios.interceptors.response.use(
    (response) => {
      calls.push(processResponse(response));
      return response;
    },
    (error) => {
      if (error.code === "ECONNREFUSED") {
        calls.push(processResponse(error));
      } else {
        calls.push(processResponse(error.response));
      }
      return error;
    }
  );

  const clearInterceptors = () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
  };

  return clearInterceptors;
};

export default setInterceptors;
