import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

const TabPanel = ({ children, index, tabValue }) =>
  tabValue === index && (
    <Box className="border border-gray-700">{children}</Box>
  );

const CustomTabs = ({ children, labels }) => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange}>
          {labels.map((label, idx) => (
            <Tab key={idx} label={label} />
          ))}
        </Tabs>
      </Box>
      <Box className="px-4 py-2">
        {labels.map((_, idx) => (
          <TabPanel key={idx} tabValue={tabValue} index={idx}>
            {Array.isArray(children) ? children[idx] : children}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default CustomTabs;
