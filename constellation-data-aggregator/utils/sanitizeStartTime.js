function sanitizeStartTime(startTime, seenTimes) {
  while (seenTimes[startTime]) {
    startTime++;
  }
  seenTimes[startTime] = true;
  return startTime;
}

module.exports = sanitizeStartTime;
