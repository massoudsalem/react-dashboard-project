import {
  Box,
  Divider,
  Unstable_Grid2 as Grid,
  Paper,
  Rating,
  Stack,
  Typography,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../services/FakeApi';
import ImageSlider from './ImageSlider';
import {CustomTabs} from '..';

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

const boxesInfo = [
  new BoxInfo('monetization_on_sharp', 'price', 'price'),
  new BoxInfo('library_books_icon', 'No. of Orders', 'discountPercentage'),
  new BoxInfo('layers_icon', 'Available Stocks', 'stock'),
];

const ProductInfoBox = ({ icon, title, subtitle }) => (
  <Box className="flex items-center justify-between gap-6 border border-dashed border-gray-300 px-4 py-2">
    <Icon className="flex-grow text-3xl text-teal-500">{icon}</Icon>
    <Box className="flex-grow">
      <Typography variant="body1">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </Box>
  </Box>
);

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const theme = useTheme();

  const tabLabels = ['Specification', 'Details'];

  return (
    !isLoading && (
      <Box className="flex flex-col gap-20 p-20 xl:flex-row">
        <ImageSlider dataImages={data.images} />
        <Grid>
          <h1>details</h1>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Paper elevation={0} sx={{ color: theme.palette.info.dark }}>
              <a className="text-inherit no-underline" href="/#">
                brand name
              </a>
            </Paper>
            <Paper elevation={0}> seller: &quot;name&quot; </Paper>
            <Paper elevation={0} sx={{ color: 'gray' }}>
              Published: &quot;date&quot;
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
            <CustomTabs labels={tabLabels}>
              {/*Tabs Child 1*/}
              <TableContainer>
                <Table>
                  <TableBody>
                    {rows.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell className="font-bold">{row.name}:</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/*Tabs Child 2*/}
              {data.description}
            </CustomTabs>
          </Box>
        </Grid>
      </Box>
    )
  );
};

export default ProductDetails;
