import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
})

export const login = (username: string, password: string) => {
  return api.post('/login', { username, password })
}

export const saveLogs = (attlogs: any) => {
  return api.put('/savelogs', attlogs)
}

export const fetchUsers = () => api.get('/users')

export default api
