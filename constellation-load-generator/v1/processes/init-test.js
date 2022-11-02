/**
 * This init process will have to:
 * 1. Get script.js from s3 `constellation` bucket
 * 2. Write script.js to disk
 * 3. ** run polling confirmation to terminate init process
 * 4. Terminate init-process
 */

// dotenv - get environment variables
require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs").promises;
const { poll } = require("./utils/poll");
const { orchTestInitInvocation } = require("./utils/orch-test-init-invocation");
const {
  validateOrchTestInitInvocation,
} = require("./utils/validate-orch-test-init-invocation");
const { controlledDelayProcess } = require("./utils/controlled-delay-process");

const HOME_REGION = "us-west-2"; // predetermined
const BUCKET_NAME_KEYWORD = process.env.BUCKET_NAME_KEYWORD || "constellation";

const s3 = new AWS.S3({
  region: HOME_REGION,
});

const getBucket = async (keyword) => {
  try {
    const buckets = await s3.listBuckets().promise();
    const bucket = buckets.Buckets.find((bucket) => {
      return bucket.Name.includes(keyword);
    });

    return bucket;
  } catch (e) {
    console.log(e);
  }
};

const getFromBucket = async (params) => {
  try {
    const response = await s3
      .getObject({
        Bucket: params.Bucket,
        Key: params.Key,
      })
      .promise();

    return response.Body.toString(); // buffer to string
  } catch (e) {
    console.log({
      message: "Unable to get from bucket",
      error: e,
    });
  }
};

const initTest = async () => {
  try {
    console.log("test container now in init mode");
    // `constellation` is part of the bucket name
    const bucket = await getBucket(BUCKET_NAME_KEYWORD);

    const bucketParams = {
      Bucket: bucket.Name,
      Key: "script.js",
    };

    const response = await getFromBucket(bucketParams);
    console.log("script.js fetched from s3 - now writing to disk");
    // write to disk
    await fs.writeFile("src/test_config.js", response);
    console.log(
      "src/test_config.js written to disk - now polling for init-process termination"
    );

    // poll for termination, return of poll is not required
    const pollReturn = await poll(
      orchTestInitInvocation,
      validateOrchTestInitInvocation,
      1000
    );

    // - this determines when the test should start (and this process terminates)
    // - consider an awaited setTimeout + new Promise pattern for this process
    const timestamp = JSON.parse(pollReturn).timestamp;
    await controlledDelayProcess(timestamp);
    console.log("test container now in exiting init mode, entering test mode");
  } catch (e) {
    console.log(e);
  }
};

// module.exports = { initTest };
initTest();
