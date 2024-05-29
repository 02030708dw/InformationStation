import axios from 'axios'

const request = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:30000
})

request.interceptors.request.use(function (config) {
    let gwRequestFlag=config.params?.gw//是否为gw请求
    if(gwRequestFlag){
      config.baseURL=import.meta.env.VITE_GW_BASE_API
    }else{
      const domain = new URL(window.location.origin).hostname; // 获取主机名部分 "php.44dog.cc"
      const subdomain = domain.split('.')[0]; // 获取 "php"
      ['php','vnd','thb','idn'].includes(subdomain)
      ?config.headers['country'] = subdomain
      :config.headers['country'] = 'thb'
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

request.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });
  const get = (url, params) => request.get(url, { params });
  const post = (url, data,params) => request.post(url, data,{params});
  const del = (url, params) => request.delete(url, { params });
  
  export { get, post, del };