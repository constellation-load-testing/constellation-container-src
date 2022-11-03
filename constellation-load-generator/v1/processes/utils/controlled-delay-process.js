/**
 * This function delays the process given a timestamp
 * @param {number} timestamp
 */

const controlledDelayProcess = async (timestamp) => {
  try {
    const now = new Date().getTime();
    const delay = timestamp - now;
    console.log({ delay });
    if (delay <= 0) {
      // no delay if negative (not likely to happen)
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  } catch (e) {
    console.log(e);
  }
};

export default controlledDelayProcess;
