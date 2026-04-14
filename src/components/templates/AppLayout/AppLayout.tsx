import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'

const routes = [
  { label: 'Vehicle List', path: '/listing' },
  { label: 'Registration Form', path: '/form' },
]

function routeToTabIndex(pathname: string) {
  const idx = routes.findIndex((r) => pathname.startsWith(r.path))
  return idx === -1 ? 0 : idx
}

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const tabIndex = routeToTabIndex(location.pathname)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        backgroundImage:
          'radial-gradient(900px 500px at 10% 0%, rgba(99,102,241,0.15), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(168,85,247,0.12), transparent 55%)',
      }}
    >
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
              Vehicle Registration Portal
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Transport Records and Verification
            </Typography>
          </Box>
          <Tabs
            value={tabIndex}
            textColor="inherit"
            indicatorColor="secondary"
            onChange={(_, nextIndex: number) => navigate(routes[nextIndex].path)}
          >
            {routes.map((r) => (
              <Tab key={r.path} label={r.label} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: { xs: 2, sm: 3 } }}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}

