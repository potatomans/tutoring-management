import { Helmet } from 'react-helmet-async';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, TextField, Stack, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SuperUserContext from '../SuperUserContext';
import userContext from '../UserContext';
// services
import { setUserToken, createNewTutor } from '../services/userService';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const StyledField = styled(TextField)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const AddEditTutorPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(userContext);
  const [name, setName] = useState('');
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserToken(user.token);
    try {
      const tutorObj = {
        name,
        endDate,
      };
      const res = await createNewTutor(tutorObj);
      if (!(res.status === 201)) throw Error;
      alert('Tutor Added');
      setName('');
      setEndDate('');
    } catch (error) {
      alert('Error! User not added!');
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title> New User </title>
      </Helmet>

      <StyledRoot>
        <Typography
          variant="h4"
          sx={{ px: 4, m: 1, mr: 5 }}
        >
          Add New Tutor
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(value ) => setEndDate(value)}
              />
            </LocalizationProvider>
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              value={user.id}
              name="UserId"
              label="User ID"
              style={{ marginTop: 10 }}
              disabled
            />
          </Stack>
          <Stack spacing={0.5}>
            <StyledField
              value={user.superUserId}
              name="superUserId"
              label="super User ID"
              style={{ marginTop: 10 }}
              disabled
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{ ml: 1 }}
          >
            Submit
          </Button>
        </form>
      </StyledRoot>
    </>
  );
};

export default AddEditTutorPage;
