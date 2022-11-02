/**
 * this util file invokes the orchestrator lambda @ home region
 */

const AWS = require("aws-sdk");
const { getOrchestratorLambda } = require("./get-orch-lambda");
const HOME_REGION = "us-west-2"; // predetermined

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
    console.log({
      message: "Unable to invoke orchestrator lambda",
      error: e,
    });
  }
};

module.exports = {
  orchAggInitInvocation,
};
