import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/api/sessions`;

// let config = null

// export const setSessionToken = newToken => {
//     const token = `Bearer ${newToken}`
//     config = {
//         headers: { Authorization: token },
//     }
// }

export const getAllSession = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createSession = async (session) => {
    const res = await axios.post(baseUrl, session)
    return res.data
}