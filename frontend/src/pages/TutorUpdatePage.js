import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, TextField, Divider, Stack, Button } from '@mui/material';
import users from '../_mock/user';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
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

// ----------------------------------------------------------------------

export default function TutorUpdatePage() {
    const mdUp = useResponsive('up', 'md');
    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const formDataObject = {};

        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });


        console.log('before', users);

        const matchedTutee = users.find(user => user.name === formDataObject.tutee)
        const newTutee = {
            ...matchedTutee,
            noOfSessions: matchedTutee.noOfSessions + 1,
            sessionDescrip: matchedTutee.sessionDescrip.concat(formDataObject.description)
        }
        console.log(newTutee.noOfSessions)
        users.map(user => {
            if (user.name === formDataObject.tutee) {
                return newTutee
            }
            return user;
        })
        console.log('after', users)
    }
    return (
        <>
            <Helmet>
                <title> Update tutor </title>
            </Helmet>
            
            <StyledRoot>
                {mdUp && (
                    <StyledContent>
                        <Typography variant="h2" sx={{ px: 4, mt: 2, mb: 5, mr: 5}}>
                        Tutor Update Form
                        </Typography>
                    </StyledContent>
                )}
                <form onSubmit={handleUpdate}>
                    <Stack spacing={3}>
                        <TextField required name="tutor" label="Tutor name" />
                    </Stack>

                    <Stack spacing={3}>
                        <TextField required name="tutee" label="Tutee name" />
                    </Stack>

                    <Stack spacing={3}>
                        <TextField required name="date" label="Date of session" />
                    </Stack>

                    <Stack spacing={3}>
                        <TextField required name="hours" label="Number of hours" />
                    </Stack>

                    <Stack spacing={3}>
                        <TextField required name="description" label="Session description" />
                    </Stack>
                    
                    <Button type='submit' variant='contained'>Submit</Button>
                </form>
{/* 
            <Container maxWidth="sm">
                <StyledContent>
                    <Typography variant="h4" gutterBottom>
                    Hello!
                    </Typography>
                </StyledContent>
            </Container> */}
            </StyledRoot>
        </>
    )
}