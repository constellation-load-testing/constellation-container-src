/**
 * this util file invokes the orchestrator lambda @ home region
 */

const AWS = require("aws-sdk");
const { getOrchestratorLambda } = require("./get-orch-lambda");
const HOME_REGION = process.env.HOME_REGION || "us-west-2";
const REGION = process.env.REGION || "us-east-1";
const lambda = new AWS.Lambda({
  region: HOME_REGION,
});

const orchTestInitInvocation = async () => {
  try {
    const orchestratorLambda = await getOrchestratorLambda();
    // lambda is found
    console.log({ lambda: orchestratorLambda.FunctionName });

    const event = {
      FunctionName: orchestratorLambda.FunctionName,
      InvocationType: "RequestResponse",
      // this is the obj passed to the lambda, REQUIRED to be stringified
      Payload: JSON.stringify({
        type: "test-init",
        region: REGION,
      }),
    };

    const response = await lambda.invoke(event).promise();
    const rawStringPayload = response.Payload;
    console.log("poll payload", { payload: rawStringPayload });
    return rawStringPayload; // raw string payload
  } catch (e) {
    console.log({
      message: "Unable to invoke orchestrator lambda",
      error: e,
    });
  }
};

module.exports = {
  orchTestInitInvocation,
};
