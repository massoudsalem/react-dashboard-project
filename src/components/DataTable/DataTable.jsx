import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const tableHeadings = [
  {
    name: 'Name',
    id: 'name',
  },
];
const DataTable = () => {
  console.log('DataTable');
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow />
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
