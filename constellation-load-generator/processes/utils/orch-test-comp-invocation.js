import AWS from "aws-sdk";
import getOrchestratorLambda from "./get-orch-lambda.js";
const HOME_REGION = process.env.HOME_REGION; 
const lambda = new AWS.Lambda({
  region: HOME_REGION,
});

const orchTestCompInvocation = async ({ region }) => {
  try {
    const orchestratorLambda = await getOrchestratorLambda();
    const event = {
      FunctionName: orchestratorLambda.FunctionName,
      InvocationType: "RequestResponse",
      // this is the obj passed to the lambda, REQUIRED to be stringified
      Payload: JSON.stringify({
        type: "test-end",
        region: region,
      }),
    };

    await lambda.invoke(event).promise();
  } catch (e) {
    console.log({
      message: "Unable to invoke orchestrator lambda",
      error: e,
    });
  }
};

export default orchTestCompInvocation;
