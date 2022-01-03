import axios from 'axios'
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API as string,
    timeout: 5000
})

service.interceptors.request.use(
    config=>{
        window.$loading.start()
        return config
    },
    err => {
        window.$loading.error()
        return Promise.reject(err)
    }
)

service.interceptors.response.use(
    response=>{
        window.$loading.finish()
        return response.data
    },
   err => {
       window.$loading.error()
        return Promise.reject(err);
    }
)
export default service