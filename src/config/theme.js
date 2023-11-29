import { createMuiTheme, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: '12px',

        "&$focused": {
          "color": "#6F9CEB"
        }
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid #6F9CEB',
        },
      },
    },
    MuiFilledInput: {
      root: {
        fontSize: '12px',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
      },
    },
    MuiSelect: {
      root: {
        fontSize: '12px',
      }
    },
    MuiButton: {
      root: {
        borderRadius: '0px',
      },
    },
    MuiFormHelperText: {
      contained: {
        'margin-left': 0,
      },
    },
    MuiTableRow: {
      root: {
        backgroundColor: '#1f1f1f',

        '&:nth-of-type(odd)': {
          backgroundColor: 'red',
        },

        '&:nth-of-type(even)': {
          backgroundColor: '#121212',
        },

        '&:nth-of-type(1)': {
          backgroundColor: '#121212',
        }
      },
    },
  },
  palette: {
    primary: {
      main: "#6F9CEB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1D283E",
      contrastText: "#FFFFFF",
    },
  },
});

export default theme;
