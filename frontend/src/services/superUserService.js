import axios from 'axios';
import { localTesting } from './serviceConstants';

let baseUrl;
if (localTesting) {
  baseUrl = 'http://localhost:3001/api/superUser';
} else {
  baseUrl = '/api/superUser';
}

let token = null;

export const setSuperUserToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAllSuperUserUsers = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get(`${baseUrl}/users`, config);
  return res.data;
};

export const getAllSuperUserTutors = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get(`${baseUrl}/tutors`, config);
  return res.data;
};

export const getAllSuperUserTutees = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.get(`${baseUrl}/tutees`, config);
  return res.data;
};
