import { createTheme } from "@mui/material";
import { grey, deepOrange } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: deepOrange["A400"],
    },
    background: {
      default: grey[50],
    },
  },
});
