import React from "react";
import { Container, Typography, Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const About = () => {
  return (
    <Container>
      <StyledPaper>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          exercitationem illum doloribus facere, facilis soluta iusto saepe
          tenetur totam magni necessitatibus sapiente enim? Illo aspernatur
          quisquam voluptatum cumque pariatur itaque, reiciendis placeat earum.
          Dolorum iste quam harum voluptate tenetur corrupti libero aut, eveniet
          eius eaque minima doloremque pariatur est veritatis. Obcaecati
          adipisci, dicta explicabo saepe reiciendis cumque quidem sapiente.
          Rem neque beatae error, adipisci sed, laudantium debitis eum sunt nemo
          dolorum quos quaerat ex officia doloremque corrupti quisquam nam
          commodi iure consequatur a maiores quasi dolores nobis explicabo!
          Illum possimus accusamus eos, reiciendis odio nulla et ipsam omnis
          est? Esse?
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default About;
