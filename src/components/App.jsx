import { Box, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Navbar } from '.';

const App = () => (
  <Box display="flex">
    <Navbar />
    <CssBaseline />
    <Box component="main" className="p-3 w-full transition-all duration-500">
      <Box className="h-[70px]" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Box>
  </Box>
);

export default App;
