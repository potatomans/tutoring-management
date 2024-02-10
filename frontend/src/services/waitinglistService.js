import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/api/waitingList`;

export const createWaitingList = async (item) => {
    const res = await axios.post(baseUrl, item)
    return res.data
}