import axios from 'axios'
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API as string,
    timeout: 5000
})
export default service