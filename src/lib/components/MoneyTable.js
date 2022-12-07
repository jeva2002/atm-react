import { useEffect, useState } from 'react';
import { getMoney } from '../functions/request';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const createRows = (_money) => {
  const rows = [];
  for (let i = 0; i < _money.length; i++) {
    let { id, denomination, amount, name } = _money[i];
    rows.push({ id, denomination, amount, name });
  }
  return rows;
};

const MoneyTable = () => {
  const [money, setMoney] = useState({});

  useEffect(() => {
    getMoney().then((res) => {
      setMoney(res.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>NAME</TableCell>
            <TableCell align='right'>ID</TableCell>
            <TableCell align='right'>DENOMINATION</TableCell>
            <TableCell align='right'>AMOUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createRows(money).map((element) => {
            return (
              <TableRow
                key={element.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{element.name}</TableCell>
                <TableCell align='right'>{element.id}</TableCell>
                <TableCell align='right'>{element.denomination}</TableCell>
                <TableCell align='right'>{element.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoneyTable;
