import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./client";
import { SnackbarComponent } from "./client/snackbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@styles/theme";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <App />
          <SnackbarComponent />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
