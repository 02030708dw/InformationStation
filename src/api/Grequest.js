import axios from "axios";
const request = axios.create({
  baseURL: import.meta.env.VITE_GW_BASE_API,
  timeout: 30000,
});

request.interceptors.request.use(
  function (config) {
    config.headers['Currency']='THB'
    console.log(config)
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const getG = (url, params,headers) => request.get(url, { params,headers });
const postG = (url, data, params) => request.post(url, data, { params });

export { getG, postG };
