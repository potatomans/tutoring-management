import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/tutees'

export const getAllTutees = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}