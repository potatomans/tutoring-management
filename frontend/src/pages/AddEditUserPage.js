import { Helmet } from 'react-helmet-async';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Alert,
  Link,
  Container,
  FormControlLabel,
  Typography,
  TextField,
  Stack,
  Button,
  Item,
  Switch,
  FormGroup,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  stepperClasses,
} from '@mui/material';
import { AdapterDayjs, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import SuperUserContext from '../SuperUserContext';
// services
import {setSuperUserToken, createNewUser} from '../services/superUserService'
// hooks
import useResponsive from '../hooks/useResponsive';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
  }));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    minHeight: '30vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const mdUp = useResponsive('up', 'md');

  useEffect(()=>{
    if (!superUser){
      const loggedSuperUserJSON = window.localStorage.getItem('loggedSuperUser')
      const parsedSuperUser = JSON.parse(loggedSuperUserJSON)
    if (loggedSuperUserJSON){
      setSuperUser(parsedSuperUser)
    } else {
      alert('No logged in S-User')
      navigate('/login')
    }}
  },[])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(superUser.superUserToken)
    setSuperUserToken(superUser.superUserToken)
    try{
      const userObj = {
        email, name, username, password
      }
      const res = await createNewUser(userObj)
      if (!(res.status === 201)) throw Error
      alert('User Added')
      // setName('')
      // setEmail('')
      // setUsername('')
      // setPassword('')
    }catch (error){
      alert('User not added!')
      console.log(error)
    }
  }

  return (
    <>
      <Helmet>
        <title> New User </title>
      </Helmet>

      <StyledRoot>
        <Typography variant="h4" sx={{ px: 4, m: 1, mr: 5 }}>
          Add New User (Volunteer Manager)
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={0.2}>
            <StyledField
              required
              value={name}
              onChange={({ target }) => setName(target.value)}
              name="name"
              label="Name?"
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              name="email"
              label="Email ID?"
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="userName"
              label="user Name for Login?"
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="password"
              label="Password?"
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              value={superUser.id}
              name="superUserId"
              label="super User ID"
              style={{marginTop:10}}
              disabled
            />
          </Stack>
          <Button type="submit" variant="contained" sx={{ ml: 1 }}>
            Submit
          </Button>
        </form>
      </StyledRoot>
    </>
  );
};

export default AddEditUserPage;
