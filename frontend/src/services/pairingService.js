import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/pairings'

export const getAllPairings = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const getPairing = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}