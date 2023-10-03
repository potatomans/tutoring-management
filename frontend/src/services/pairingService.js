import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/pairings'

export const getAllPairings = async (userId) => {
    console.log('inner userId', userId)
    const res = await axios.get(`${baseUrl}/${userId}`)
    return res.data
}

export const getPairing = async (id) => {
    const res = await axios.get(`${baseUrl}/user/${id}`)
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