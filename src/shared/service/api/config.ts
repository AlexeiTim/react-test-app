import axios from 'axios'

const csrfHeader = { 'X-CSRFToken': localStorage.getItem('token') }

axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`

const apiBaseURL = `${import.meta.env.VITE_APP_API_URL}`

axios.defaults.baseURL = apiBaseURL

axios.interceptors.response.use(
    response => response,
    (error) => {
        console.error(error)
        return Promise.reject(error)
    },
)

export default {
    csrfHeader,
}
