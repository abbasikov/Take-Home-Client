import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const axiosBaseUrl = () => {
  axios.defaults.baseURL = 'http://localhost:8080/api';
  return axios;
};

export { setAuthToken, axiosBaseUrl };
