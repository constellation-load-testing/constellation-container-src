/**
 * This post process will have to:
 * 1. Run k6 with the script.js
 * 2. accomodate a process that maintains the container alive
 * 2.1 this process will send a signal to stop the container
 */
require("dotenv").config();
const { orchTestCompInvocation } = require("./utils/orch-test-comp-invocation");
const REGION = process.env.REGION || "us-east-1";
const COMP_TEST_INITIAL_DELAY = 10000; // 10s

const compTest = async () => {
  console.log(`test container now comp mode`);
  console.log(`entering ${COMP_TEST_INITIAL_DELAY} delay`);
  // stall for 10s - assures all other tests have completed
  // - NOTE: need to ensure that this is atleast 2x longer as final agg duration
  // - @jake
  await new Promise((resolve) => setTimeout(resolve, COMP_TEST_INITIAL_DELAY));

  // send test-end signal to orchestrator
  // - will need more information like: cloudformation stack name
  await orchTestCompInvocation({ region: REGION });
  console.log("test-comp message sent to orchestrator, region:", REGION);
  console.log("test container now indefinitely stalled");

  const stalling = new Promise((_) => {
    setInterval(() => {}, 2147483647 - 1); // max interval
  });

  await stalling;
};

// module.exports = { compTest };
compTest();
