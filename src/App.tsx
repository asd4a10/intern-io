import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { createTheme, ThemeProvider } from "@mui/material";

// store
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;

const theme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: "#90A4AE",
    },
  },
  typography: {
    fontFamily: [
      "Avenir",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
