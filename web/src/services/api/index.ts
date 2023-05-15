import axios from "axios"
import { getSavedToken } from "./auth"

export const api = axios.create({
  baseURL: "http://localhost:8080",
})

api.interceptors.request.use(
  config => {
    const token = getSavedToken()
    if (token) {
      if (!config.headers) config.headers = {}
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

export default api
