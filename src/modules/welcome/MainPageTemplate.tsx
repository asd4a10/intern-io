import Header from "../header/Header.tsx";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Footer from "../header/Footer.tsx";
import Box from "@mui/material/Box";

const MainPageTemplate = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        overflowY: "scroll",
        mx: "auto",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container
        maxWidth="xl"
        sx={{ flexGrow: "1", pt: "2rem", maxWidth: "1600px" }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default MainPageTemplate;
