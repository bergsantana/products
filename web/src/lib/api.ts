import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST 
const API_PORT = import.meta.env.VITE_API_PORT



const api = axios.create({
    baseURL: `${API_HOST}${API_PORT ? ':' + API_PORT : ''}`
})

function useBearerToken(token: string) {
    console.log('user bearer trigger')
    api.defaults.headers.common = { Authorization: `Bearer ${token}` }
}

export { api, useBearerToken }