'use strict';

import { sleep } from "../src/utils/sleep.js";

export const options = {
  vus: 200,
  duration: 10000,
  async test(axiosInstance) {
    await axiosInstance.post(
      "http://localhost:5000/target",
      { timeStamp: Date.now() }
    );
    await sleep(1000);
  }
}

// export default async function (axios) {
//   await axios.get("http://localhost:5000/target");
//   await sleep(1000);
//   await axios.post("http://localhost:5000/target", { timeStamp: Date.now() });
//   await sleep(1000);
// }
