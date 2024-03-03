import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Autocomplete, Button, Container, FormControl, Input, InputLabel, OutlinedInput, TextField } from "@mui/material";

import { getPairing } from "../services/pairingService";

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

const SuperUsersPairingEditPage = () => {
  const { pairingId } = useParams();
  const [pairingData, setPairingData] = useState();

  console.log("id", pairingId)
  console.log("pairingData", pairingData)

  useEffect(() => {
    getPairing(pairingId)
      .then((data) => setPairingData(data));
  }, []);

  const handleChange = () => {
    // TODO: update state once form fields change
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form data", pairingData.tutor.name, pairingData.tutee.name)
    // TODO: submit form state containing important details
    // TODO: add endpoints for pairing updates
  }

  return (
    pairingData &&
    (<Container maxWidth="xl">
      <form onSubmit={handleFormSubmit}>
        <TextField
          value={pairingData.tutor.name}
          label="Tutor Name"
        />
        <TextField
          value={pairingData.tutee.name}
          label="Tutor Name"
        />
        <Autocomplete
          options={levels}
          label="Tutor Name"
          sx={{ width: 300 }}
          renderInput={(params) => {console.log("params", params)
          return(<TextField {...params} label="Level" value={params.inputProps.value} />)}} // TODO: update state upon selection of option
          value={pairingData.subjects[0].level}
        />
        <TextField
          value={pairingData.location}
          label="Location"
        />
        <Button type="submit" variant="contained">Update</Button>
      </form>
    </Container>)
  )
}

export default SuperUsersPairingEditPage;