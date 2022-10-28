const setInterceptors = (axios) => {
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
};

export default setInterceptors;
