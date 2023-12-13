import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/sessions'

let token = null

export const setSessionToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllSession = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(baseUrl, config)
    return res.data
}

export const createSession = async (session, pair) => {
    const res = await axios.post(baseUrl,{ session,  pair})
    return res.data
}