import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/tutees'

export const getAllTutees = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const getTuteeId = async (name) => {
    const res = await axios.get(`${baseUrl}?name=${name}`)
    return Number(res.data[0].id)
}

export const createTutee = async (tutee) => {
    const res = await axios.post(baseUrl, tutee)
    return res.data
}