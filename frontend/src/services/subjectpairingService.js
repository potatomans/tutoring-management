import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/api/subjectpairings`;

export const createSubjectPairing = async (pairingId) => {
    const res = await axios.post(baseUrl, { pairingId, subjectId: 1 })
    return res.data
}