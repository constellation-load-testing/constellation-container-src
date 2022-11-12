import AWS from "aws-sdk";
import getOrchestratorLambda from "./get-orch-lambda.js";
const HOME_REGION = process.env.HOME_REGION || "us-west-2";
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
    // TooManyRequestsException handling
    if (e.name === "TooManyRequestsException") {
      // randomize between 2000 and 100000 ms
      const randomTime = Math.floor(Math.random() * 8000) + 2000;
      console.log("TooManyRequestsException, waiting", randomTime, "ms");
      await new Promise((resolve) => setTimeout(resolve, randomTime));
      await orchTestCompInvocation({ region });
    } else {
      console.log({
        message: "Unable to invoke orchestrator lambda",
        error: e,
      });
    }
  }
};

export default orchTestCompInvocation;
