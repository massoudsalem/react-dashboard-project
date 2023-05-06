import {
  Box,
  Divider,
  Unstable_Grid2 as Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  Icon,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../services/FakeApi';
import ImageSlider from './ImageSlider';

class BoxInfo {
  constructor(icon, title, dataName) {
    this.icon = icon;
    this.title = title;
    this.dataName = dataName;
  }
}
const createData = (name, value) => ({ name, value });

const rows = [
  createData('Category', 'T-Shirt'),
  createData('Brand', 'Tommy Hilfiger'),
  createData('Color', 'Blue'),
];

const TabPanel = ({ children, index, tabValue }) =>
  //eslint-disable-next-line implicit-arrow-linebreak
  tabValue === index && (
    <Box className="border border-gray-700">{children}</Box>
  );

const boxesInfo = [
  new BoxInfo('monetization_on_sharp', 'price', 'price'),
  new BoxInfo('library_books_icon', 'No. of Orders', 'discountPercentage'),
  new BoxInfo('layers_icon', 'Available Stocks', 'stock'),
];

const ProductInfoBox = ({ icon, title, subtitle }) => (
  <Box className="px-4 py-2 border border-dashed border-gray-300 flex gap-6 items-center justify-between">
    <Icon className="flex-grow text-teal-500 text-3xl">{icon}</Icon>
    <Box className="flex-grow">
      <Typography variant="body1">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </Box>
  </Box>
);

const ProductDetails = () => {
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const theme = useTheme();

  const handleTabsChange = (event, newValue) => setTabValue(newValue);

  return (
    !isLoading && (
      <Box className="flex gap-20 p-20">
        <ImageSlider dataImages={data.images} />
        <Grid>
          <h1>details</h1>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Paper elevation={0} sx={{ color: theme.palette.info.dark }}>
              {' '}
              <a className="text-inherit no-underline" href="/#">
                brand name
              </a>
            </Paper>
            <Paper elevation={0}> seller: &quot;name&quot; </Paper>
            <Paper elevation={0} sx={{ color: 'gray' }}>
              {' '}
              Published: &quot;date&quot;{' '}
            </Paper>
          </Stack>
          <Rating
            readOnly
            value={4.5}
            precision={0.1}
            size="small"
            className="mt-2"
          />
          <Stack direction="row" spacing={2}>
            {boxesInfo.map((box, idx) => (
              <ProductInfoBox
                key={idx}
                title={box.title}
                icon={box.icon}
                subtitle={data[box.dataName]}
              />
            ))}
          </Stack>
          <Box className="my-10">
            <Typography className="my-2" variant="h6">
              Description
            </Typography>
            <Typography variant="body1">{data.description}</Typography>
          </Box>
          <Box className="my-6">
            <Typography variant="h6">Product Description :</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabsChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="Specification" />
                <Tab label="Details" />
              </Tabs>
            </Box>
            <Box className="border-2 p-5 border-spacing-4 border-red-700">
              <TabPanel tabValue={tabValue} index={0}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell className="font-bold">
                            {row.name}:
                          </TableCell>
                          <TableCell>{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel tabValue={tabValue} index={1}>
                {data.description}
              </TabPanel>
            </Box>
          </Box>
        </Grid>
      </Box>
    )
  );
};

export default ProductDetails;
