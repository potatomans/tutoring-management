import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/api/pairings`;

// export const setPairingToken = newToken => {
//     const token = `Bearer ${newToken}`
//     config = {
//         headers: { Authorization: token },
//     }
// }

export const getMasterPairings = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const getAllPairings = async (userId = null) => {
    const res = await axios.get(userId ? `${baseUrl}/${userId}` : `${baseUrl}`)
    return res.data
}

export const getPairing = async (id) => {
    const res = await axios.get(`${baseUrl}/user/${id}`)
    return res.data
}

export const getPairingId = async (tutee, tutor) => {
    const res = await axios.get(`${baseUrl}?tutee=${tutee}&tutor=${tutor}`)
    if (res.data.length === 0) {
        throw new Error('Tutee and/or tutor does not exist. Maybe try their first names?')
    }
    return Number(res.data[0].id)
}

export const createPairing = async (pairing) => {
    const res = await axios.post(baseUrl, pairing)
    return res.data
}

export const checkPairingExist = async (tutee, tutor) => {
    const res = await axios.get(`${baseUrl}?tutee=${tutee}&tutor=${tutor}`)
    if (res.data.length === 0) {
        return false
    }
    return true
}