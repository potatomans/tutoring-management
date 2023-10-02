import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/sessions'

export const getAllSession = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createSession = async (session) => {
    const res = await axios.post(baseUrl, session)
    return res.data
}