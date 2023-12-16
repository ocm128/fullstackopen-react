import axios from 'axios'
// local
//const baseUrl = 'http://localhost:3001/persons' 
const baseUrl = '/api/persons' // to deploy in part3

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

/* const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
} */

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)

}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
  deletePerson
}
