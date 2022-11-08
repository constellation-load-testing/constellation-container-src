// Default config

"use strict";

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const script = async (axiosInstance) => {
  await axiosInstance.get('https://google.com');
  await sleep(1000);
};
