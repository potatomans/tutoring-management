import axios from 'axios'
// import { localTesting } from './serviceConstants';
// let baseUrl;
// if (localTesting) {
//   baseUrl = 'http://localhost:3001/api/users';
// } else {
//   baseUrl = '/api/users';
// }

const baseUrl = `${process.env.REACT_APP_URL}/api/users`

// let config = null

// export const setUserToken = newToken => {
//     const token = `Bearer ${newToken}`
//     config = {
//         headers: { Authorization: token },
//     }
// }

export const getAllUsers = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const getUserId = async (username) => {
    const res = await axios.get(`${baseUrl}?username=${username}`)
    if (res.data.length === 0) {
        throw new Error('Volunteer manager does not exist')
    }
    return Number(res.data[0].id)
}

export const createNewTutor = async (tutorObj) => {
    const res = await axios.post(`${baseUrl}/tutor`, tutorObj);
    return res;
};

export const createNewTutee = async (tuteeObj) => {
    const res = await axios.post(`${baseUrl}/tutee`, tuteeObj);
    return res;
};