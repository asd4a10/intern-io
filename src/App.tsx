import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: "dark",
  },
  typography: {
    fontFamily: [
      "Avenir",
      // "-apple-system",
      // "BlinkMacSystemFont",
      // '"Segoe UI"',
      // "Roboto",
      // '"Helvetica Neue"',
      // "Arial",
      // "sans-serif",
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(","),
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
