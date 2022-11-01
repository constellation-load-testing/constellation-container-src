import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '5s'
}

export default function () {
  http.get("https://mockbin.org/bin/a2a9bdfa-6dcd-4af2-bc82-b7ad610036fa");
  sleep(1);
}
