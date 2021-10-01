import { createTheme } from "@mui/material";
import { grey, deepOrange } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange["500"],
    },
    secondary: {
      main: grey[50],
    },
    background: {
      default: grey[50],
    },
  },
});
