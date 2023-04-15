import { Box, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '.';

const App = () => (
  <Box>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </Box>
);

export default App;
