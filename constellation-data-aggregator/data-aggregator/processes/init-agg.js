/**
 * This is the initial process of the aggregator. Its job is:
 * - send the region to which this aggregator is finally running
 */
const { orchAggInitInvocation } = require("./utils/orch-agg-init-invocation");
const REGION = process.env.REGION || "us-east-1";

const initAgg = async () => {
  // send region to orchestrator
  try {
    console.log("agg container now in init mode");
    await orchAggInitInvocation({ region: REGION });
    console.log("agg container now exiting init mode");
    console.log("agg container now entering agg mode");
  } catch (e) {
    console.log({
      message: "Unable to invoke orchestrator lambda",
      error: e,
    });
  }
};

// module.exports = { initAgg };
initAgg();
