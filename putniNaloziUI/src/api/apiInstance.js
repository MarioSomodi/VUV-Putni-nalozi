import axios from 'axios';

const baseURL = 'http://putni-nalozi-api.herokuapp.com/api/';

const getApiInstance = (jwt) =>
  axios.create({
    baseURL: baseURL,
    timeout: 2000,
    headers: { authorization: `Bearer ${jwt}` },
  });

const apiInstance = axios.create({
  baseURL: baseURL,
  timeout: 2000,
});

export { apiInstance, getApiInstance };
