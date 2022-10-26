function createTimestampIfUndefined(timestamp) {
  if (timestamp === undefined) {
    timestamp = Date.now()
  }
  return timestamp
}

module.exports = createTimestampIfUndefined