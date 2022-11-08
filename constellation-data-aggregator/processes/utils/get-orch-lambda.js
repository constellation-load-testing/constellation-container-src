const AWS = require("aws-sdk");
const HOME_REGION = process.env.HOME_REGION || "us-west-2";

const lambda = new AWS.Lambda({
  region: HOME_REGION,
});

const getOrchestratorLambda = async () => {
  try {
    const lambdas = await lambda.listFunctions().promise();
    const orchestratorLambda = lambdas.Functions.find((lambda) => {
      return (
        lambda.FunctionName.includes("orchestrator") &&
        lambda.FunctionName.includes("constellation")
      );
    });
    return orchestratorLambda;
  } catch (e) {
    console.log({
      message: "Unable to invoke orchestrator lambda",
      error: e,
    });
  }
};

module.exports = { getOrchestratorLambda };
