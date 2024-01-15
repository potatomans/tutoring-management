import axios from 'axios'

const baseUrl = process.env.REACT_APP_TEST==="TRUE" ? 'localhost:3001/api/waitinglist' : '/api/waitinglist'

export const createWaitingList = async (item) => {
    const res = await axios.post(baseUrl, item)
    return res.data
}