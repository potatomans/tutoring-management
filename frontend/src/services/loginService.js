import axios from 'axios'
// import {localTesting} from './serviceConstants'

const baseUrl = `${process.env.REACT_APP_URL}/api/login`;
// if (localTesting){
    // baseUrl 
// } else {
//     baseUrl = '/api/login';
// }

export const login = async (userObj) => {
    const res = await axios.post(baseUrl, userObj)
    return res.data
}

export const superUserLogin = async (superUserObj) => {
  const res = await axios.post(`${baseUrl}/superUser`, superUserObj);
  return res.data;
};