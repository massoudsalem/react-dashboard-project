import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const DataTable = ({ columns, rows, rowOnClick = null, className = '' }) => {
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
  const viableRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  return (
    <TableContainer component={Paper} className={`${className}`}>
      <Table className="h-full" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((heading) => (
              <TableCell key={heading.id}>{heading.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {viableRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                Nothing to show.
              </TableCell>
            </TableRow>
          ) : (
            viableRows.map((data, index) => (
              <TableRow
                className={`${
                  rowOnClick ? 'hover:cursor-pointer hover:opacity-60' : ''
                }`}
                key={`${data?.id}${index}`}
                onClick={rowOnClick ? () => rowOnClick(data.id) : null}
              >
                {columns.map((heading) => (
                  <TableCell key={`${heading.id}user${data.id}`}>
                    {data[heading.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className='w-full sticky bottom-0 overflow-visible'
              sx={
                {
                  backgroundColor: ({ palette }) => palette.background.paper,
                  borderTop: ({ palette }) => `1px solid ${palette.divider}`,
                  borderBottom: 'none',
                }
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
