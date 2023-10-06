import React, { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Button, Snackbar, Alert, Container, Box } from "@mui/material";

function Deletion({ Title, Load, Reps }) {
  const baseUrl = "https://workoutapi-fjcr.onrender.com/api";
  const history = useHistory();
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [err, setErr] = useState(false);

  const handleDelete = () => {
    const ans = window.confirm("Are you sure you want to delete this workout?");
    if (ans) {
      axios
        .delete(`${baseUrl}/workouts/` + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const token = localStorage.getItem("token");
          const id = localStorage.getItem("_id");

          if (!token) {
            setErr(true);
            setTimeout(() => {
              setErr(false);
            }, 1500);
          } else if (!id) {
            setErr(true);
            setTimeout(() => {
              setErr(false);
            }, 1500);
          } else {
            setDeleted(true);
            setTimeout(() => {
              history.push("/AllWorkouts");
              setDeleted(false);
            }, 1500);
          }
        })
        .catch((error) => {
          if (error.response) {
            setErr(true);
            console.error("Delete failed:", error.response.data);
          } else if (error.request) {
            setErr(true);
            console.error("Network error:", error.request);
          } else if (error.message) {
            setErr(true);
            console.error("Unexpected error:", error.message);
          }

          setTimeout(() => {
            setErr(false);
          }, 1500);
          setDeleted(false);
        });
    }
  };

  return (
    <Container>
      <Box mt={2} textAlign="center">
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
        <Snackbar
          open={deleted}
          autoHideDuration={1500}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">Workout Deleted Successfully</Alert>
        </Snackbar>
        <Snackbar
          open={err}
          autoHideDuration={1500}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">An error occurred. Please try again.</Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default Deletion;
