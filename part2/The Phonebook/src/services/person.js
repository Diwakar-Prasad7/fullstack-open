import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(Response => Response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(Response => Response.data)
}

const dlt = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(Response => Response.data)
}

export default { getAll, create, dlt, update }