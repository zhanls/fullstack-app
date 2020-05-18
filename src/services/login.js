import axios from 'axios'
const REST_login = 'http://localhost:3001/api/login'

const login = credentials => {
  return axios.post(REST_login, credentials).then(res => res.data)
}

export default { login }