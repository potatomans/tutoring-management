import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

export const getAllUsers = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const getUserId = async (username) => {
    const res = await axios.get(`${baseUrl}?username=${username}`)
    if (res.data.length === 0) {
        console.log('volunteer manager does not exst')
        throw new Error('volunteer manager does not exst')
    }
    return Number(res.data[0].id)
}