import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: "auto",
        pt: "2rem",
        pb: "0.5rem",
        textAlign: "center",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
      }}
    >
      <Divider variant="middle" />
      <Typography sx={{ py: "0.5rem" }} variant={"subtitle1"}>
        Copyright © 2023 Amanzholov Technologies. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
