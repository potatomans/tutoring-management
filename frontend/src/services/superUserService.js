import axios from 'axios';
// import { localTesting } from './serviceConstants';

// let baseUrl;
// if (localTesting) {
//   baseUrl = 'http://localhost:3001/api/superUser';
// } else {
//   baseUrl = '/api/superUser';
// }

const baseUrl = `${process.env.REACT_APP_URL}/api/superUser`;

// let config = null;

// export const setSuperUserToken = (newToken) => {
//     const token = `Bearer ${newToken}`;
//     config = {
//       headers: { Authorization: token },
//     };
// };

export const getAllSuperUserUsers = async () => {
  const res = await axios.get(`${baseUrl}/users`);
  return res.data;
};

export const getAllSuperUserPairings = async () => {
  const res = await axios.get(`${baseUrl}/pairings`);
  return res.data;
};

export const getAllSuperUserTutors = async () => {
  const res = await axios.get(`${baseUrl}/tutors`);
  return res.data;
};

export const getAllSuperUserTutees = async () => {
  const res = await axios.get(`${baseUrl}/tutees`);
  return res.data;
};

export const getUserToken = async (id) =>{
  const res = await axios.get(`${baseUrl}/user/${id}`)
  return res.data
}

export const createNewUser = async (userObj) => {
  const res = await axios.post(`${baseUrl}/users`, userObj)
  return res.data
}