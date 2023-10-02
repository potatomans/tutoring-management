import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/tutors'

export const getTutorId = async (name) => {
    const res = await axios.get(`${baseUrl}?name=${name}`)
    return Number(res.data[0].id)
}

export const createTutor = async (tutor) => {
    const res = await axios.post(baseUrl, tutor)
    return res.data
}