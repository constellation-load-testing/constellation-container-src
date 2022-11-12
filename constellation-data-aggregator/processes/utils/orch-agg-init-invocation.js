/**
 * this util file invokes the orchestrator lambda @ home region
 */

const AWS = require("aws-sdk");
const { getOrchestratorLambda } = require("./get-orch-lambda");
const HOME_REGION = process.env.HOME_REGION || "us-west-2";

const lambda = new AWS.Lambda({
  region: HOME_REGION,
});

const orchAggInitInvocation = async ({ region }) => {
  try {
    const orchestratorLambda = await getOrchestratorLambda();
    console.log("lambda found:", { lambda: orchestratorLambda.FunctionName });

    const payload = {
      // this is the obj passed to the lambda
      type: "agg-record",
      region: region,
    };

    const event = {
      FunctionName: orchestratorLambda.FunctionName,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(payload),
    };

    await lambda.invoke(event).promise();
  } catch (e) {
    // TooManyRequestsException handling
    if (e.name === "TooManyRequestsException") {
      // randomize between 2000 and 100000 ms
      const randomTime = Math.floor(Math.random() * 8000) + 2000;
      console.log("TooManyRequestsException, waiting", randomTime, "ms");
      await new Promise((resolve) => setTimeout(resolve, randomTime));
      await orchAggInitInvocation({ region });
    } else {
      console.log({
        message: "Unable to invoke orchestrator lambda",
        error: e,
      });
    }
  }
};

module.exports = {
  orchAggInitInvocation,
};
