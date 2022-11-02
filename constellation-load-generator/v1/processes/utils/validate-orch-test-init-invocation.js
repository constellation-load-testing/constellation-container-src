/**
 * This util function validates the return of the orchestrator lambda function
 * returns true if the return is valid, false otherwise
 */
const validateOrchTestInitInvocation = (rawStringPayload) => {
  const { state } = JSON.parse(rawStringPayload);
  if (true === state) {
    return true;
  }
  return false;
};

module.exports = {
  validateOrchTestInitInvocation,
};
