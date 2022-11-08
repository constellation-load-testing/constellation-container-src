import setInterceptors from "./setInterceptors";
import axios from 'axios';

jest.mock("axios");
const mockedAxios = jest.mocked(axios, { shallow: false });

afterEach(() => {
  jest.clearAllMocks();
});

const setup = () => {
  const axiosInstance = mockedAxios.create();
  const axiosCall = () => {
    axiosInstance.get("http://localhost:5000/target");
  }

  const testObject = {
    testID: 0,
    startTime: Date.now(),
    calls: [],
  };

  return {
    axiosInstance,
    testObject,
    axiosCall,
  }
};

test('attach interceptors to axios instance', () => {

});
