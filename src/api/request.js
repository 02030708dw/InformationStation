import axios from "axios";
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,
});
const DomainNames = {
  TH: "thb.44dog.com",
  INA: "idn.44dog.com",
  VND: "vnd.44dog.com",
  PH: "php.44dog.com",
  // TH: "localhost",
};
request.interceptors.request.use(
  function (config) {
    const domain = window.location.hostname;
    const subdomain = Object.keys(DomainNames).find((key) => DomainNames[key] === domain) || "TH";
    config.headers["country"] = subdomain;
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
const get = (url, params) => request.get(url, { params });
const post = (url, data, params) => request.post(url, data, { params });

export { get, post };