import {createContext, useState} from 'react'

const SuperUserContext = createContext()

export const SuperUserContextProvider = (props) => {
  const [superUser, setSuperUser] = useState('SU-CTX')
  return(
    <SuperUserContext.Provider value={[superUser, setSuperUser]}>
      {props.children}
    </SuperUserContext.Provider>
  )
}

export default SuperUserContext