import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import {
  Typography,
  Container,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import Modifier from "./Modifier";
import Deletion from "./Deletion";
import Back from "./Back";

function Workoutdetails() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  const baseUrl = "https://workoutapi-fjcr.onrender.com/api";
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (String(id) !== String(data._id)) {
      axios
        .get(`${baseUrl}/workouts/` + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setData(res.data);
          const token = localStorage.getItem("token");
          const id = localStorage.getItem("_id");

          if (!token) {
            setErr("Request is not authorized");
            setTimeout(() => {
              setErr("");
            }, 1500);
          } else if (!id) {
            setErr("No such Workout");
            setTimeout(() => {
              setErr("");
            }, 1500);
          }
        })
        .catch((err) => {
          setErr(err.message);
        });
    }
  }, [id, data._id]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Box mt={2}>
        <Typography variant="h4" textAlign="center">
          Workout Details
        </Typography>
        <Modifier
          key={data._id}
          Title={data.title}
          Load={data.load}
          Reps={data.reps}
        />
        <Deletion
          key={data._id}
          Title={data.title}
          Load={data.load}
          Reps={data.reps}
        />
        <Back />
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

export default Workoutdetails;
