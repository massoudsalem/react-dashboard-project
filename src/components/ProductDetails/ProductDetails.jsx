import {
  Box,
  Divider,
  Unstable_Grid2 as Grid,
  Rating,
  Typography,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  CircularProgress,
  Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../services/FakeApi';
import ImageSlider from './ImageSlider';
import { CustomTabs } from '..';

class BoxInfo {
  constructor(icon, title, data) {
    this.icon = icon;
    this.title = title;
    this.data = data;
  }
}
const createData = (name, value) => ({ name, value });

const ProductInfoBox = ({ icon, title, subtitle }) => (
  <Box className="flex items-center justify-center gap-6 border border-dashed border-gray-300 px-4 py-2">
    <Icon color="primary" className="text-3xl">
      {icon}
    </Icon>
    <Box className="">
      <Typography className="text-lg">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  </Box>
);

const tabLabels = ['Specification', 'Details'];

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <Box className="flex h-screen items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  const boxesInfo = [
    new BoxInfo('monetization_on_sharp', 'Price:', `${data.price}$`),
    new BoxInfo(
      'library_books_icon',
      'Orders:',
      `${Math.trunc(data.price / 12)}`,
    ),
    new BoxInfo('layers_icon', 'Stock:', data.stock),
  ];

  const rows = [
    createData('Title', data.title),
    createData('Category', data.category),
    createData('Brand', data.brand),
    createData('Discount', `${data.discountPercentage}%`),
    createData('color', 'Blue'),
  ];

  return (
    <Box className="justify-evenly gap-6 lg:flex">
      <Box className="flex self-start">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Icon>arrow_back</Icon>
        </Button>
      </Box>

      <ImageSlider dataImages={data.images} />
      <Grid>
        <Typography variant="h4" className="text-center lg:text-left">
          {data.title}
        </Typography>

        <Box className="flex flex-col flex-wrap items-center justify-center sm:flex-row sm:gap-4 lg:justify-start">
          <Divider className="my-1 sm:hidden" flexItem />
          <Typography variant="body2">Brand: {data.brand}</Typography>
          <Divider
            className="hidden sm:inline"
            orientation="vertical"
            flexItem
          />
          <Divider className="my-1 sm:hidden" flexItem />
          <Typography variant="body2">Seller: Amazon</Typography>
          <Divider
            className="hidden sm:inline"
            orientation="vertical"
            flexItem
          />
          <Divider className="my-1 sm:hidden" flexItem />
          <Typography
            align="center"
            variant="body2"
            className="flex items-center"
          >
            Rating:{' '}
            <Rating
              readOnly
              value={data.rating}
              precision={0.1}
              size="small"
              className="ml-2"
            />
          </Typography>
          <Divider className="my-1 sm:hidden" flexItem />
        </Box>

        <Divider className="invisible my-4 sm:visible" />

        <Box className="mx-0 flex flex-col justify-center gap-4 sm:flex-row ">
          {boxesInfo.map((box, idx) => (
            <ProductInfoBox
              key={idx}
              title={box.title}
              icon={box.icon}
              subtitle={box.data}
            />
          ))}
        </Box>
        <Box className="lg:my-10">
          <Typography className="my-2" variant="h6">
            Description:
          </Typography>
          <Typography variant="body1">{data.description}</Typography>
        </Box>
        <Box className="my-6">
          <Typography variant="h6">Product Description:</Typography>
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
            <Typography variant="body1" className="w-48 sm:w-80 lg:w-96">
              {data.description}
            </Typography>
          </CustomTabs>
        </Box>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
