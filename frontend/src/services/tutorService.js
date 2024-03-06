import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/api/tutors`;

// let config = null

// export const setTutorToken = newToken => {
//     const token = `Bearer ${newToken}`
//     config = {
//         headers: { Authorization: token },
//     }
// }

export const getTutorId = async (name) => {
    const res = await axios.get(`${baseUrl}?name=${name}`)
    return Number(res.data[0].id)
}

export const createTutor = async (tutor) => {
    const res = await axios.post(baseUrl, tutor)
    return res.data
}

export const updateTutor = async ({ tutorId, newTutor }) => {
    const res = await axios.put(`${baseUrl}/${tutorId}`, newTutor)
    return res.data
}