import axios from 'axios'

const request = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:10000
})

// 请求拦截
request.interceptors.request.use()

// 详情拦截
request.interceptors.response.use()

export default request