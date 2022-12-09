import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

const createRows = (_money) => {
  const rows = [];
  for (let i = 0; i < _money.length; i++) {
    let { id, denomination, amount, name } = _money[i];
    rows.push({ id, denomination, amount, name });
  }
  return rows;
};

const getTotal = (_setTotal) => {
  const totalDenomination = document.querySelectorAll('.totalDenomination');
  let total = 0;
  for (let i = 0; i < totalDenomination.length; i++) {
    total += parseInt(totalDenomination[i].innerHTML);
  }
  _setTotal(total);
};

const DeliveredTable = ({ delivered }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getTotal(setTotal);
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>NAME</TableCell>
            <TableCell align='center'>ID</TableCell>
            <TableCell align='center'>DENOMINATION</TableCell>
            <TableCell align='center'>AMOUNT</TableCell>
            <TableCell align='center'>TOTAL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createRows(delivered).map((element) => {
            const totalDenomination = element.denomination * element.amount;
            return (
              <TableRow
                key={element.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{element.name}</TableCell>
                <TableCell align='center'>{element.id}</TableCell>
                <TableCell align='center'>{element.denomination}</TableCell>
                <TableCell align='center'>{element.amount}</TableCell>
                <TableCell className='totalDenomination' align='center'>
                  {totalDenomination}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell align='center'>TOTAL</TableCell>
            <TableCell align='center'></TableCell>
            <TableCell align='center'></TableCell>
            <TableCell align='center'></TableCell>
            <TableCell align='center'>{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeliveredTable;
