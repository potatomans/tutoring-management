import axios from 'axios'
import {localTesting} from './serviceConstants'

let baseUrl
if (localTesting){
    baseUrl = 'http://localhost:3001/api/login';
}else {
    baseUrl = '/api/login';
}

export const login = async (userObj) => {
    const res = await axios.post(baseUrl, userObj)
    return res.data
}