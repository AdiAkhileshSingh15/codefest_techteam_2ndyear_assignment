import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Snackbar,
  Alert,
  Container,
  Box,
  TextField,
  Grid,
} from "@mui/material";

function Modifier({ Title, Load, Reps }) {
  const { id } = useParams();
  const baseUrl = "https://workoutapi-fjcr.onrender.com/api";

  const [load, setLoad] = useState(Load);
  const [reps, setReps] = useState(Reps);
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccessMessage] = useState("");
  const [err, setErr] = useState("");

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleOkClick = () => {
    axios
      .patch(
        `${baseUrl}/workouts/` + id,
        {
          load: load,
          reps: reps,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSuccessMessage("Workout Updated Successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1500);
        setIsEditing(false);
      })
      .catch((error) => {
        setErr("An error occurred. Please try again.");
        setIsEditing(false);
      });
  };

  return (
    <Container>
      <Box mt={2} textAlign="center">
        {isEditing ? (
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <TextField
                label="Load"
                type="number"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </Grid>
            <Grid item>
              <Button onClick={() => setLoad(Number(load) + 1)} variant="contained">
                +
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => setLoad(Number(load) - 1)} variant="contained">
                -
              </Button>
            </Grid>
            <Grid item>
              <TextField
                label="Reps"
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </Grid>
            <Grid item>
              <Button onClick={() => setReps(Number(reps) + 1)} variant="contained">
                +
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => setReps(Number(reps) - 1)} variant="contained">
                -
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleOkClick}
                variant="contained"
                color="success"
              >
                Ok
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Box mt={2} p={2} bgcolor="#f0f0f0" borderRadius={10}>
            <Typography variant="h5" gutterBottom>
              Title: {Title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Load: {load}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Reps: {reps}
            </Typography>
          </Box>
        )}
        {!isEditing && (
          <Button
            onClick={handleUpdateClick}
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
          >
            Update
          </Button>
        )}
        {success && (
          <Snackbar
            open={true}
            autoHideDuration={1500}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success">{success}</Alert>
          </Snackbar>
        )}
        {err && (
          <Snackbar
            open={true}
            autoHideDuration={1500}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error">{err}</Alert>
          </Snackbar>
        )}
      </Box>
    </Container>
  );
}

export default Modifier;
