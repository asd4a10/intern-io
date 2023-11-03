import Header from "../header/Header.tsx";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

const MainPageTemplate = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Outlet />
      </Container>

      {/*<Footer />*/}
    </>
  );
};

export default MainPageTemplate;
