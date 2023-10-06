import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/subjectpairings'

export const createSubjectPairing = async (pairingId) => {
    const res = await axios.post(baseUrl, { pairingId, subjectId: 1 })
    return res.data
}