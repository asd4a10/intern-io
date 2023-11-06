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
        pt: "2rem",
        pb: "0.5rem",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        // justifyContent: "center",
      }}
    >
      <Typography variant={"h3"}>Dear user, Welcome to Intern.io!</Typography>
      {/*<Typography variant={"h5"}>*/}
      {/*  We hope you will find your Amazing internship here!*/}
      {/*</Typography>*/}
      <Typography variant={"h5"}>
        Click{" "}
        <Link style={{ color: "black" }} to="/companies">
          here
        </Link>{" "}
        to see top IT companies in the world.
      </Typography>
    </Box>
    // </>
  );
};

export default WelcomePage;
