import axios from 'axios'

const csrfHeader = { 'X-CSRFToken': localStorage.getItem('token') }

// export function setToken(newToken: string | null) {
//   
//   newToken ? localStorage.setItem('token', newToken) : clearToken()
// }
axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`
function clearToken() {
    localStorage.removeItem('token')
}

const apiBaseURL = `${import.meta.env.VITE_APP_API_URL}`

axios.defaults.baseURL = apiBaseURL

axios.interceptors.response.use(
    response => response,
    (error) => {
        console.error(error)
        if (error.response.status === 401 || error.response.status === 403)
            clearToken()

        return Promise.reject(error)
    },
)

export default {
    csrfHeader,
    clearToken,
}
