import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  fontFamily: "Roboto sans-serif",
  fontWeight: 300,
  palette: {
    primary: {
      main: "#F0706A",
    },
    secondary: {
      main: "#2F2F2F",
    },
    error: {
      main: "#B20000",
    },
    background: {
      default: "#fffeea",
    },
  },
});

export default theme;
