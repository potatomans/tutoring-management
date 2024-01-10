import { useContext } from "react"
import SuperUserContext from "../SuperUserContext"

const SuperUsersUserListPage = () => {
  const [superUser, setSuperUser] = useContext(SuperUserContext)

  return (
    <>
    <div>SuperUsersUserListPage</div>
    <p>{superUser}</p>
    </>
  )
}

export default SuperUsersUserListPage