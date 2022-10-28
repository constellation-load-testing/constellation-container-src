import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import child_process from 'child_process';
const spawn = child_process.spawn;

const getTestScript = async () => {
  try {
    const response = await axios.get(process.env.URL);
    console.log({s3Object: response.data});
    const content = response.data;

    fs.writeFile('script.js', content, 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The test script file has been saved!');
    });
  } catch (e) {
    console.error(e.message);
  }
};

const runTest = () => {
  try {
    const aggTarget = `influxdb=http://${process.env.DNS}`;
    const k6 = spawn('k6', [
      'run',
      '--no-summary',
      '--no-thresholds',
      '--out',
      aggTarget,
      'script.js',
    ]
      // `k6 run --no-summary --no-thresholds --out influxdb=http://teleproto:8186 script.js`
    );

    k6.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
    });

    k6.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
    });

    k6.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
      console.log('Test finished running!');
    });
  } catch (e) {
    console.error(e.message);
  }
};

const getAndTest = async () => {
  await getTestScript();
  runTest();
};

getAndTest();


