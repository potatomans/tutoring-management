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
  IconButton,
} from '@mui/material';

// @mui icons
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

// services
import { getAllSuperUserPairings } from '../services/superUserService';
import { setAxiosHeaders } from "../services/serviceConstants";

// components
import SuperUserContext from '../SuperUserContext';
import Iconify from '../components/iconify/Iconify';
import Scrollbar from '../components/scrollbar';
import GenericTableHead from '../components/generic-table-head/index';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'Point of Contact', label: 'Point of Contact', alignRight: false },
  { id: 'Organisation', label: 'Organisation', alignRight: false },
  { id: 'Tutor', label: 'Tutor', alignRight: false },
  { id: 'Tutee', label: 'Tutee', alignRight: false },
  {},
  {},
];

const SuperUsersPairingListPage = () => {  
  const [superUser, setSuperUser] = useContext(SuperUserContext);
  const [pairingList, setPairingList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedSuperUserJSON = localStorage.getItem('loggedUser');
    const parsedSuperUser = JSON.parse(loggedSuperUserJSON);
    if (loggedSuperUserJSON) {
      setAxiosHeaders();
      setSuperUser(parsedSuperUser);
      // setSuperUserToken(parsedSuperUser.superUserToken);
      initPage();
    } else if (!superUser && !parsedSuperUser) {
      alert('No logged in SuperUser');
      navigate('/login');
    } else {
      initPage(superUser);
    }
  }, []);
  const initPage = () => {
    getAllSuperUserPairings()
      .then((data) => {
        setPairingList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Helmet>
        <title>Pairings Dashboard</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Pairings List
        </Typography>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <GenericTableHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {pairingList.map((pairing, index) => {
                    const { id, user, tutor, tutee } = pairing;
                    return (
                      <TableRow key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">{user.organisation}</TableCell>
                        <TableCell align="left">{tutor.name}</TableCell>
                        <TableCell align="left">{tutee.name}</TableCell>
                        {/* <TableCell>
                          <IconButton color="default"><VisibilityIcon /></IconButton>
                        </TableCell> */}
                        <TableCell>
                          <IconButton 
                            color="default" 
                            onClick={() => navigate(`/superuser/pairings/edit/${id}`)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        {/* <TableCell align="left">{name}</TableCell> */}
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

export default SuperUsersPairingListPage;