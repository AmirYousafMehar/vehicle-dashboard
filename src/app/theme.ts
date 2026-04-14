import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F3D66',
    },
    secondary: {
      main: '#2E7D32',
    },
    background: {
      default: '#F2F5F8',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      'Roboto',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontSize: '1.7rem',
      fontWeight: 700,
      letterSpacing: '0.01em',
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 700,
      letterSpacing: '0.01em',
    },
    h6: {
      fontSize: '1.05rem',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    subtitle1: {
      fontSize: '0.98rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.45,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundImage:
            'linear-gradient(90deg, rgba(15,61,102,0.97), rgba(20,81,133,0.95))',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          minHeight: 46,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.86rem',
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.92rem',
          backgroundColor: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 16,
          minHeight: 40,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
})

