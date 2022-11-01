'use strict';

import { sleep } from "../src/utils/sleep.js";

export const options = {
  vus: 1,
  duration: 15000,
  async script(axiosInstance) {
    await axiosInstance.post(
      "http://localhost:5000/target",
      { timeStamp: Date.now() }
    );
    await sleep(500);
    await axiosInstance.get("http://localhost:5000/target")
    await sleep(500)
    await axiosInstance.get("http://localhost:5000")
    await sleep(1500)
  }
}
