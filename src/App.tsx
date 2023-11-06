import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
