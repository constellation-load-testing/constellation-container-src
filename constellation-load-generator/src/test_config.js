// /**
//  * This will be run in a node.js environment
//  * - This just run a sleep function for 5 seconds and send a single request to placeholer aggregator
//  * */

// const axios = require("axios");
// const DNS = process.env.DNS || "localhost:3000";

// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

// const run = async () => {
//   // this serves no purpose but just to delay axios.get for some reason
//   await sleep(2000);
//   console.log({
//     message: "Starting test-sleep, making DNS /fromscript request to",
//     DNS,
//   });
//   const response = await axios.get(`http://${DNS}/fromscript`);
//   console.log({ message: "DNS response", response: response.data });
//   await sleep(5000);
//   return { statusCode: 200, body: "Done" };
// };

// // module.exports = { script: run };
// run();

"use strict";

import { sleep } from "./utils/sleep.js";

export const config = {
  vus: 5,
  duration: 5000,
  async script(axiosInstance) {
    await axiosInstance.post("http://localhost:5000/target", {
      timeStamp: Date.now(),
    });
    await sleep(500);
    await axiosInstance.get("http://localhost:5000/target");
    await sleep(500);
  },
};