import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

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
import { getAllSuperUserTutors } from '../services/superUserService';

// components
import SuperUserContext from '../SuperUserContext';
import Iconify from '../components/iconify/Iconify';
import Scrollbar from '../components/scrollbar';
import GenericTableHead from '../components/generic-table-head/index';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'endDate', label: 'End-Date', alignRight: false },
];
const SuperUsersTutorListPage = () => {
  const [superUser, setSuperUser] = useContext(SuperUserContext);
  const [tutorList, setTutorList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedSuperUserJSON = window.localStorage.getItem('loggedUser');
    const parsedSuperUser = JSON.parse(loggedSuperUserJSON);
    if (loggedSuperUserJSON) {
      setSuperUser(parsedSuperUser);
      // setSuperUserToken(parsedSuperUser.superUserToken);
      initPage(superUser);
    } else if (!superUser && !parsedSuperUser) {
      alert('No logged in S-User');
      navigate('/login');
    } else {
      initPage(superUser);
    }
  }, []);
  const initPage = (superUser) => {
    getAllSuperUserTutors()
      .then((data) => {
        setTutorList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>SU Users-List</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          TUTORS LIST
        </Typography>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <GenericTableHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {tutorList.map((tutor) => {
                    const { id, name, endDate } = tutor;
                    return (
                      <TableRow key={id}>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{endDate?.slice(0,10)}</TableCell>
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
};

export default SuperUsersTutorListPage;
