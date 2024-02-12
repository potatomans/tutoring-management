import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Alert, Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import UserContext from '../../../UserContext';
import SuperUserContext from '../../../SuperUserContext';
import Iconify from '../../../components/iconify';
// services
import { login, superUserLogin } from '../../../services/loginService'
import { setAxiosHeaders } from '../../../services/serviceConstants';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext)
  const [superUser, setSuperUser] = useContext(SuperUserContext)

  const [isSuperUser, setIsSuperUser] = useState(false)
  const [username, setUsername] = useState('');
  const [superUserName, setSuperUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notif, setNotif] = useState(null);

  const handleClick = async () => {
    // post it to /api/login, then render accordingly.
    try {
        const user = await login({ username, password })
        localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        // setPairingToken(user.token)
        setAxiosHeaders()
        // setSessionToken(user.token)
        // setTutorToken(user.token)
        // setTuteeToken(user.token)
        // setUserToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        navigate('/dashboard', { replace: true });
    } catch (exception) {
        setNotif('Incorrect credentials')
        setTimeout(() => setNotif(null), 5000)
    }
  };

  const handleSuperUserClick = async () => {
    try {
        const superUser = await superUserLogin({name:superUserName, password})
        localStorage.setItem(
          'loggedUser', JSON.stringify(superUser)
        )
        setAxiosHeaders()
        setSuperUser(superUser)
        navigate('/superuser/users')
    } catch (exception){
        setNotif('Incorrect SuperUser Credentials')
        setTimeout(()=>setNotif(null), 5000)
    }
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ my: 2 }}>
        <Checkbox
          name="superUserLogin"
          label="Super User Login"
          onClick={() => setIsSuperUser(!isSuperUser)}
          checked={isSuperUser}
        />
        SuperUser Login?
      </Stack>
      <Stack spacing={3}>
        {isSuperUser ? (
          <TextField
            name="superUserName"
            label="Super-User Username"
            value={superUserName}
            onChange={({ target }) => setSuperUserName(target.value)}
          />
        ) : (
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        )}

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        Remember me
      </Stack>

      {notif ? (
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
          {notif}
        </Alert>
      ) : null}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={isSuperUser ? handleSuperUserClick : handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}