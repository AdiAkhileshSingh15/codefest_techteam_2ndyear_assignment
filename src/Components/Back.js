import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

const Back = () => {
  const history = useHistory();

  const handleBack = () => {
    history.push("/AllWorkouts");
  };

  return (
    <Box mt={2} display="flex" justifyContent="center">
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        size="large"
      >
        Back
      </Button>
    </Box>
  );
};

export default Back;
