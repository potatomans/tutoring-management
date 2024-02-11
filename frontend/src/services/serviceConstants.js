// // export const localTesting = true
// let config = null

import axios from "axios"

// const localStorageUser = JSON.parse(localStorage.getItem("loggedUser"))

// if (localStorageUser) {
//     const token = `Bearer ${localStorageUser.token}`
//     config = {
//         headers: { Authorization: token },
//     }
// }

export const getToken = () => {
    const localStorageUser = JSON.parse(localStorage.getItem("loggedUser"))
    if (localStorageUser) {
        return localStorageUser.token  
    }
    return null
}

export const setAxiosHeaders = (token = null) => {
    axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token || getToken()}`
        return config
    })
}

export const removeAxiosHeaders = () => {
    axios.interceptors.request.use((config) => {
        config.headers.Authorization = ''
        return config
    })
}