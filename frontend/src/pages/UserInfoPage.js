import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, TextField, Divider, Stack, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import users from '../_mock/user'

    
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));


function Counting() {
    return (
        <Typography>
        {users.map(user => (
            <Accordion>
                <AccordionSummary>
                    <Typography>
                        {user.sessionDate}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {user.sessionDescrip}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))}
        </Typography>
    )
}

export default function TutorUpdatePage() {
    const mdUp = useResponsive('up', 'md');
    return (
        <>
            <StyledRoot>
                <h1>{users[0].name}</h1>
            </StyledRoot>
                <Accordion>
                <AccordionSummary
                >
                <Typography>Tutee details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <h2>Level/Subject(s)</h2>
                    <p>{users[0].levelSubject}</p>
                    <h2>Location</h2>
                    <p>{users[0].location}</p>
                    <h2>Number of sessions</h2>
                    <p>{users[0].noOfSessions}</p>
                    <h2>Organisation</h2>
                    <p>{users[0].organisation}</p>
                </Typography>
                </AccordionDetails>
                </Accordion>
                <Accordion>
                <AccordionSummary
                >
                <Typography>Tutor details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <h2>Tutor</h2>
                    <p>{users[0].tutor}</p>
                    <h2>Email</h2>
                    <p>{users[0].tutorEmail}</p>
                    <h2>Phone number</h2>
                    <p>{users[0].tutorPhone}</p>
                    <h2>Tutoring end date</h2>
                    <p>{users[0].tutorEndDate}</p>
                </Typography>
                </AccordionDetails>
                </Accordion>
                <Accordion>
                <AccordionSummary
                >
                <Typography>Tutee assessments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <h2>Strengths</h2>
                    <p>{users[0].strength}</p>
                    <h2>Weaknesses</h2>
                    <p>{users[0].weakness}</p>
                </Typography>
                </AccordionDetails>
                </Accordion>
                <Accordion>
                <AccordionSummary
                >
                <Typography>Tutee records</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                {Counting()}
                </Typography>
                </AccordionDetails>
                </Accordion>
                

            <Helmet>
                <title> Update tutor </title>
            </Helmet>


        </>
    )
}