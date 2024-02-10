import axios from 'axios';
import { localTesting } from './serviceConstants';

// let baseUrl;
// if (localTesting) {
//   baseUrl = 'http://localhost:3001/api/superUser';
// } else {
//   baseUrl = '/api/superUser';
// }

const baseUrl = `${process.env.REACT_APP_URL}/api/superUser`;

let token = null;

const config = {
  headers: { Authorization: token },
};

export const setSuperUserToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAllSuperUserUsers = async () => {
  // const config = {
  //   headers: { Authorization: token },
  // };
  const res = await axios.get(`${baseUrl}/users`, config);
  return res.data;
};

export const getAllSuperUserTutors = async () => {
  // const config = {
  //   headers: { Authorization: token },
  // };
  const res = await axios.get(`${baseUrl}/tutors`, config);
  return res.data;
};

export const getAllSuperUserTutees = async () => {
  // const config = {
  //   headers: { Authorization: token },
  // };
  const res = await axios.get(`${baseUrl}/tutees`, config);
  return res.data;
};

export const getUserToken = async (id) =>{
  // const config = {
  //   headers: { Authorization: token}
  // }
  const res = await axios.get(`${baseUrl}/user/${id}`, config)
  return res.data
}

export const createNewUser = async (userObj) => {
  // const config = {
  //   headers: { Authorization: token },
  // };
  const res = await axios.post(`${baseUrl}/users`, userObj, config)
  return res
}