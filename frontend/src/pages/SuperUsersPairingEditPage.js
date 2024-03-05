import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { 
  Alert,
  Autocomplete, 
  Button, 
  Container,
  IconButton, 
  Stack, 
  TextField 
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import dayjs from "dayjs";

import { getPairing, updatePairing } from "../services/pairingService";
import { updateTutor } from "../services/tutorService";

// List of subject levels. TODO: consider moving these to a constants file, especially if reusing logic.
const levels = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "Secondary 1",
  "Secondary 2",
  "Secondary 3",
  "Secondary 4",
  "Secondary 5",
];

const subjectNames = [
  "Chinese",
  "Combined Science",
  "English",
  "Malay",
  "Mathematics",
  "Science",
  "Tamil",
]

const SuperUsersPairingEditPage = () => {
  const { pairingId } = useParams();
  const [pairingData, setPairingData] = useState();
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPairing(pairingId)
      .then((data) => setPairingData(data));
  }, []);

  const handlePairingChange = ({ prop, value }) => {
    setPairingData({ ...pairingData, [prop]: value })
  }

  const handleTutorChange = ({ prop, value }) => {
    const newTutor = { ...pairingData.tutor, [prop]: value };
    setPairingData({ ...pairingData, tutor: newTutor });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Update pairing table
    const { id: pairingId, userId, tuteeId, tutorId, strengths, weaknesses, goals, location, level, subjectName } = pairingData;
    const newPairing = { userId, tuteeId, tutorId, strengths, weaknesses, goals, location, level, subjectName };
    await updatePairing({ pairingId, newPairing });

    // Update tutor table
    const { name, number, endDate } = pairingData.tutor;
    const newTutor = { name, number, endDate };
    await updateTutor({ tutorId, newTutor });

    setSuccess("Pairing information updated!");
    setTimeout(() => setSuccess(null), 5000);
  }

  return (
    pairingData &&
    (<Container maxWidth="xl">
      { success && 
      (<Alert variant='filled' severity='success' sx={{ marginBottom: 2 }}>
        {success}
      </Alert>)}
      <IconButton 
        color="default"
        onClick={() => navigate('/superuser/pairings')}
      >
        <ArrowBackIcon sx={{marginBottom: 2}} />
      </IconButton>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
          <TextField
            value={pairingData.tutor.name}
            label="Tutor Name"
            onChange={({ target }) => handleTutorChange({ prop: "name", value: target.value })}
          />
          <TextField
            type="date"
            value={dayjs(pairingData.tutor.endDate).format('YYYY-MM-DD')}
            label="Tutor End Date"
            onChange={({ target }) => handleTutorChange({ prop: "endDate", value: new Date(target.value).toISOString() })}
          />
          <TextField
            value={pairingData.tutor.number}
            label="Tutor Phone Number"
            onChange={({ target }) => handleTutorChange({ prop: "number", value: target.value })}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
          <TextField
            value={pairingData.tutee.name}
            label="Tutee Name"
            onChange={({ target }) => {
              const newTutee = { ...pairingData.tutee, name: target.value };
              setPairingData({ ...pairingData, tutee: newTutee });
            }}
            disabled
          />
          <TextField
            value={pairingData.location}
            label="Location"
            onChange={({ target }) => handlePairingChange({ prop: "location", value: target.value })}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
          <Autocomplete
            options={levels}
            label="Tutor Name"
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Level" />}
            value={pairingData.level}
            onChange={(ev, value) => handlePairingChange({ prop: "level", value })}
          />
          <Autocomplete
            options={subjectNames}
            label="Subject Name"
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Subject Name" />}
            value={pairingData.subjectName}
            onChange={(ev, value) => handlePairingChange({ prop: "subjectName", value })}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
          <TextField
            value={pairingData.strengths}
            label="Strengths"
            onChange={({ target }) => handlePairingChange({ prop: "strengths", value: target.value })}
            sx={{width: "35rem"}}
            multiline
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
          <TextField
            value={pairingData.weaknesses}
            label="Weaknesses"
            onChange={({ target }) => handlePairingChange({ prop: "weaknesses", value: target.value })}
            sx={{width: "35rem"}}
            multiline
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
          <TextField
            value={pairingData.goals}
            label="Goals"
            onChange={({ target }) => handlePairingChange({ prop: "goals", value: target.value })}
            sx={{width: "35rem"}}
            multiline
          />
        </Stack>
        <Button type="submit" variant="contained">Update</Button>
      </form>
    </Container>)
  )
}

export default SuperUsersPairingEditPage;