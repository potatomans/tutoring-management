import { useContext, useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';

// services
import { getAllSuperUserUsers, getUserToken } from '../services/superUserService';
import { setAxiosHeaders } from "../services/serviceConstants";

// components
import SuperUserContext from '../SuperUserContext';
import Iconify from "../components/iconify/Iconify";
import Scrollbar from '../components/scrollbar';
import GenericTableHead from "../components/generic-table-head/index";

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  {}, // Keep empty object for uniform heading colour
];


const SuperUsersUserListPage = () => {
  const [superUser, setSuperUser] = useContext(SuperUserContext)
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const loggedSuperUserJSON = localStorage.getItem('loggedUser')
    const parsedSuperUser = JSON.parse(loggedSuperUserJSON)
    if (loggedSuperUserJSON) {
      setAxiosHeaders()
      setSuperUser(parsedSuperUser)
      // setSuperUserToken(parsedSuperUser.superUserToken)
      initPage(superUser)
    } else if (!superUser && !parsedSuperUser){
      alert('No logged in S-User')
      navigate('/login')
    } else {
      initPage()
    }
  },[])

  const initPage = () => {
    getAllSuperUserUsers().then((data)=>{
      setUserList(data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleNewUser = () =>{
    navigate('/superuser/users/addedit')
  }

  const handleAssumeUserRole = (id) => {
    // getUserToken(id).then((data)=>{
    //   localStorage.setItem(
    //     'loggedUser',JSON.stringify(data)
    //   )
    //   navigate('/dashboard/app')
    // }).catch((err)=>{
    //   console.log(err)
    // })
    const currLoggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const newLoggedUser = { ...currLoggedUser, assumeRole: id };
    localStorage.setItem("loggedUser", JSON.stringify(newLoggedUser));
    navigate('/dashboard/app');
  }

  return (
    <>
      <Helmet>
        <title>Partners Dashboard</title>
      </Helmet>
      {/* <p>{JSON.stringify(superUser)}</p>
      <p>{JSON.stringify(userList)}</p> */}
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi {superUser.name}
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewUser}>
            Add Partner
          </Button>
        </Stack>
        <Typography variant="h4" sx={{ mb: 5 }}>
          List of Partners
        </Typography>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <GenericTableHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {userList.map((user)=>{
                    const {id, name, email, username} = user  
                    return (
                      <TableRow key={id}>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" onClick={() => handleAssumeUserRole(id)}>
                            Assume Role
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}

export default SuperUsersUserListPage