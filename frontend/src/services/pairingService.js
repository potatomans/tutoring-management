import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/pairings'

let token = null

export const setPairingToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllPairings = async (userId) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}/${userId}`, config)
    return res.data
}

export const getPairing = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}/user/${id}`, config)
    return res.data
}

export const getPairingId = async (tutee, tutor) => {
    const res = await axios.get(`${baseUrl}?tutee=${tutee}&tutor=${tutor}`)
    if (res.data.length === 0) {
        console.log('tutee and/or tutor does not exst')
        throw new Error('tutee and/or tutor does not exst')
    }
    return Number(res.data[0].id)
}

export const createPairing = async (pairing) => {
    const res = await axios.post(baseUrl, pairing)
    return res.data
}