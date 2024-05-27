import axios from 'axios'

const request = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:30000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let gwRequestFlag=config.params?.gw//是否为gw请求
    if(gwRequestFlag){
      config.baseURL=import.meta.env.VITE_GW_BASE_API
    }
    console.log(config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  const get = (url, params) => request.get(url, { params });
  const post = (url, data) => request.post(url, data);
  const del = (url, params) => request.delete(url, { params });
  
  export { get, post, del };