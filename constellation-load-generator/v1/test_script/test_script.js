'use strict';

import { sleep } from "../src/utils/sleep.js";

export const options = {
  vus: 1,
  duration: 500,
  async test(axiosInstance) {
    await axiosInstance.post(
      "http://localhost:5000/target",
      { timeStamp: Date.now() }
    );
    await sleep(1000);
  }
}
