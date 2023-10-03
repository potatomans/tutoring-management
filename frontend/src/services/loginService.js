import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

export const login = async (userObj) => {
    const res = await axios.post(baseUrl, userObj)
    return res.data
}