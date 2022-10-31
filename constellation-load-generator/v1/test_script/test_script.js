'use strict';

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const options = {
  vus: 2,
  duration: 500000,
  async call(axios) {
		await axios.post("http://localhost:5000/", { timeStamp: Date.now() });
    await sleep(1000);
  }
}

// export default async function (axios) {
//   await axios.get("http://localhost:5000/target");
//   await sleep(1000);
//   await axios.post("http://localhost:5000/target", { timeStamp: Date.now() });
//   await sleep(1000);
// }
