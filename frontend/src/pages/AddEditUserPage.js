import { Helmet } from 'react-helmet-async';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Typography,
  TextField,
  Stack,
  Button,
} from '@mui/material';
import SuperUserContext from '../SuperUserContext';
// services
import {createNewUser} from '../services/superUserService'
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
  }));

const StyledField = styled(TextField)(({ theme }) => ({
    padding: theme.spacing(1)
}))

// ----------------------------------------------------------------------

const AddEditUserPage = () => {
  const navigate = useNavigate()
  const [superUser, setSuperUser] = useContext(SuperUserContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if (!superUser) {
      const loggedSuperUserJSON = window.localStorage.getItem('loggedUser')
      const parsedSuperUser = JSON.parse(loggedSuperUserJSON)
    if (loggedSuperUserJSON){
      setSuperUser(parsedSuperUser)
    } else {
      alert('No logged in S-User')
      navigate('/login')
    }}
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const userObj = {
        email, name, organisation, username, password
      }
      const res = await createNewUser(userObj)
      alert('Partner Added')
      setName('')
      setEmail('')
      setOrganisation('')
      setUsername('')
      setPassword('')
    } catch (error){
      alert('Error! Partner not added!')
      console.log(error)
    }
  }

  return (
    <>
      <Helmet>
        <title> Add Partner </title>
      </Helmet>

      <StyledRoot>
        <Typography variant="h4" sx={{ px: 4, m: 1, mr: 5 }}>
          Add New Partner
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={0.2}>
            <StyledField
              required
              value={name}
              onChange={({ target }) => setName(target.value)}
              name="name"
              label="Name"
              style={{ minWidth: "25rem" }}
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              required
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              name="email"
              label="Email"
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              required
              value={organisation}
              onChange={({ target }) => setOrganisation(target.value)}
              name="organisation"
              label="Organisation"
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              required
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="userName"
              label="Username"
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="password"
              label="Password"
              type="password"
            />
          </Stack>
          {/* <Stack spacing={0.5}>
            <StyledField
              value={superUser.id}
              name="superUserId"
              label="super User ID"
              style={{marginTop:10}}
              disabled
              hidden
            />
          </Stack> */}
          <Button type="submit" variant="contained" sx={{ ml: 1 }}>
            Submit
          </Button>
          <Button variant="text" sx={{ ml: 1 }} onClick={() => navigate('/superuser/users')}>
            Back to Dashboard
          </Button>
        </form>
      </StyledRoot>
    </>
  );
};

export default AddEditUserPage;
