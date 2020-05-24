import axios from 'axios'
const REST_notes = 'http://localhost:3001/api/notes'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  }
  return axios.get(REST_notes).then(res => res.data.concat(nonExisting))
}

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(REST_notes, newObject, config).then(res => res.data)
}

const update = (id, newObject) => {
  return axios.put(`${REST_notes}/${id}`, newObject).then(res => res.data)
}

const remove = id => {
  return axios.delete(`${REST_notes}/${id}`).then(res => res.data)
}

export default { setToken, getAll, create, update, remove }
