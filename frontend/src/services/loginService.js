import axios from 'axios'

const baseUrl = process.env.REACT_APP_TEST==="TRUE" ? 'localhost:3001/api/login' : '/api/login'


export const login = async (userObj) => {
    const res = await axios.post(baseUrl, userObj)
    return res.data
}