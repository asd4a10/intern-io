import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    // <>
    <Box
      sx={{
        height: "100%",
        mt: "auto",
        pb: "0.5rem",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        // justifyContent: "center",
      }}
    >
      <Typography sx={{ mb: 2 }} variant={"h3"}>
        Welcome to Intern.io!
      </Typography>
      {/*<Typography variant={"h5"}>*/}
      {/*  We hope you will find your Amazing internship here!*/}
      {/*</Typography>*/}
      <Typography variant={"h5"}>
        Click{" "}
        <Link style={{ color: "black" }} to="/intern-io/companies">
          here
        </Link>{" "}
        to start exploring opportunities
      </Typography>
    </Box>
    // </>
  );
};

export default WelcomePage;
