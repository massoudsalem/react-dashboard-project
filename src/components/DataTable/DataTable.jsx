import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

const DataTable = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    setPage(0);
  }, [rows]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const viableRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <TableContainer component={Paper} className="min-h-0">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((heading) => (
              <TableCell key={heading.id}>{heading.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {viableRows.map((data) => (
            <TableRow key={data.id}>
              {columns.map((heading) => (
                <TableCell key={`${heading.id}user${data.id}`}>{data[heading.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
