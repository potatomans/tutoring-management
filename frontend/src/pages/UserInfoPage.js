import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, TextField, Divider, Stack, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

// components
import { useEffect, useState } from 'react';
import users from '../_mock/user';

// hooks
import useResponsive from '../hooks/useResponsive';

// services
import { getPairing } from '../services/pairingService';
    
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));


const SessionRecords = ({ sessions }) => (
        <Typography>
        {sessions.map(session => (
            <Accordion>
                <AccordionSummary>
                    <Typography variant='h6'>
                        {new Date(session.date).toDateString()}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {session.overview}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))}
        </Typography>
    )

export default function UserInfoPage() { 
    const { pathname } = useLocation()
    const pathArr = pathname.split('/')
    const id = pathArr[pathArr.length - 1]

    useEffect(() => {
        getPairing(id).then(data => {
            setPairing(data)
            const tutee = {
                tuteeName: data.tutee.name,
                subject: data.level == null ? data.subjects[0].level.concat(' ', data.subjects[0].name) : data.level,
                noOfSessions: data.sessions.length,
                organisation: data.user.organisation, 
                tutorName: data.tutor.name,
                tutorNum: data.tutor.number,
                endDate: new Date(data.tutor.endDate).toDateString(),
                ...data
            }
            setTutee(tutee)
        })
    }, [])

    const [pairing, setPairing] = useState([])

    const [tutee, setTutee] = useState([])

    const mdUp = useResponsive('up', 'md');

    const { tuteeName, subject, location, noOfSessions, organisation, tutorName, tutorNum, endDate, strengths, weaknesses, sessions } = tutee

    return (
        <>
            <StyledRoot>
                <h1>{tuteeName}</h1>
            </StyledRoot>
                <Accordion>
                <AccordionSummary
                >
                <Typography variant='h5'>Tutee details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <h2>Level/Subject(s)</h2>
                    <p>{subject}</p>
                    <h2>Location</h2>
                    <p>{location}</p>
                    <h2>Number of sessions</h2>
                    <p>{noOfSessions}</p>
                    <h2>Organisation</h2>
                    <p>{organisation}</p>
                </Typography>
                </AccordionDetails>
                </Accordion>
                <Accordion>
                <AccordionSummary
                >
                <Typography variant='h5'>Tutor details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <h2>Tutor</h2>
                    <p>{tutorName}</p>
                    <h2>Phone number</h2>
                    <p>{tutorNum}</p>
                    <h2>Tutoring end date</h2>
                    <p>{endDate}</p>
                </Typography>
                </AccordionDetails>
                </Accordion>
                <Accordion>
                <AccordionSummary
                >
                <Typography variant='h5'>Tutee assessments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <h2>Strengths</h2>
                    <p>{strengths}</p>
                    <h2>Weaknesses</h2>
                    <p>{weaknesses}</p>
                </Typography>
                </AccordionDetails>
                </Accordion>
                <Accordion>
                <AccordionSummary
                >
                <Typography variant='h5'>Tutee records</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {sessions ? <SessionRecords sessions={sessions} /> : null}
                </Typography>
                </AccordionDetails>
                </Accordion>
                

            <Helmet>
                <title> {tuteeName || 'Tutor Info'} </title>
            </Helmet>


        </>
    )
}