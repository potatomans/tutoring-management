import axios from 'axios'
import { localTesting } from './serviceConstants';

// let baseUrl;
// if (localTesting) {
//   baseUrl = 'http://localhost:3001/api/users';
// } else {
//   baseUrl = '/api/users';
// }

const baseUrl = `${process.env.REACT_APP_URL}/api/users`

let token = null

export const setUserToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllUsers = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(baseUrl, config)
    return res.data
}

export const getUserId = async (username) => {
    const config = {
        headers: { Authorization: token },
    }
    const res = await axios.get(`${baseUrl}?username=${username}`, config)
    if (res.data.length === 0) {
        throw new Error('Volunteer manager does not exist')
    }
    return Number(res.data[0].id)
}

export const createNewTutor = async (tutorObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(`${baseUrl}/tutor`, tutorObj, config);
  return res;
};

export const createNewTutee = async (tuteeObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(`${baseUrl}/tutee`, tuteeObj, config);
  return res;
};