import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

export const getAllUsers = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}
