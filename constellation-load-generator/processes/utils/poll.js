/**
 * This is a util function for polling - is provided with:
 * 1. fn - the function to be polled (ie: axios.get, .post, etc)
 * 2. fnIsValid - the function to determine if the information extracted from fn is valid
 * 3. interval - the interval to poll
 */

const poll = async (cb, isCbResultValid, interval) => {
  let result = await cb();
  // either true or false
  while (!isCbResultValid(result)) {
    await wait(interval);
    // re-executes the
    console.log({ result });
    result = await cb();
  }

  return result;
};

const wait = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default poll;
