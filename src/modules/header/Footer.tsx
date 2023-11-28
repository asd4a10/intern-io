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
        Copyright © 2023 Leveroff Corp. All Rights Reserved.{" "}
        <a
          style={{
            // textDecoration: "underline",
            color: "black",
          }}
          target="_blank"
          href="https://github.com/asd4a10/intern-io"
        >
          Github page
        </a>
        .
      </Typography>
    </Box>
  );
};

export default Footer;
