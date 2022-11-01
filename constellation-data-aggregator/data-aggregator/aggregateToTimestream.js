const intervalSendToTimestream = require('./services/intervalSendToTimestream');

const run = async () => {
  await new Promise((resolve, _) => {
    setTimeout(() => resolve(), 1000)
		intervalSendToTimestream();
  })
}

run()
