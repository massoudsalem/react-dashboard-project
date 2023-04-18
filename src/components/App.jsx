import { Box, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Navbar } from '.';

const App = () => (
  <Box>
    <Navbar />
    <Box className="h-[70px]" />
    <CssBaseline />
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </Box>
);

export default App;
