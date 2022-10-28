import axios from 'axios';

export const options = {
  vus: 100,
  duration: '5s'
}

export default function () {
  // return axios.get("http://mockbin.org/bin/a953bf53-c692-4114-8a9c-a6c84037414a?foo=bar&foo=baz");
  return axios.get("http://localhost:5000/target")
}
