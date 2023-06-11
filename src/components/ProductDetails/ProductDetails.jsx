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
import { CustomTabs } from '..';

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
  <Box className="flex items-center justify-start gap-6  border border-dashed border-gray-300 px-4 py-2">
    <Icon className="text-3xl text-teal-500">{icon}</Icon>
    <Box className=" flex-grow">
      <Typography variant="body1">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </Box>
  </Box>
);

const tabLabels = ['Specification', 'Details'];
const productHeaderDetails = [
  { identifer: 'Brand', value: 'BrnadName' },
  { identifer: 'Seller', value: 'Zoetic Fashion' },
  { identifer: 'Published', value: '26 May, 1998' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);

  return (
    !isLoading && (
      <Box className="gap-6 pr-4 md:px-24 md:pl-0 lg:flex">
        <ImageSlider dataImages={data.images} />
        <Grid>
          <h1>details</h1>
          <div className="flex flex-col gap-x-6 md:flex-row md:items-center">
            {productHeaderDetails.map((item, index) => {
              return (
                <>
                  <p className="my-1 py-2 text-sm" key={item.identifer}>
                    <span className={`${!index && 'hidden'} text-gray-900`}>
                      {item.identifer}:{' '}
                    </span>
                    <span
                      className={`${!index && 'text-indigo-800'} font-medium`}
                    >
                      {item.value}
                    </span>
                  </p>
                  <div className="h-[0.05rem] w-full bg-gray-200 last:hidden  md:flex md:h-[2rem] md:w-[.02rem]" />
                </>
              );
            })}
          </div>

          <Rating
            readOnly
            value={4.5}
            precision={0.1}
            size="small"
            className="mt-2"
          />
          <Box className="mx-0 flex flex-col  gap-4 md:flex-row ">
            {boxesInfo.map((box, idx) => (
              <ProductInfoBox
                key={idx}
                title={box.title}
                icon={box.icon}
                subtitle={data[box.dataName]}
              />
            ))}
          </Box>
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
