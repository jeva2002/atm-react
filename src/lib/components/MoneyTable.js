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
  const [accumulated, setAccumulated] = useState(0);

  let total = 0;

  useEffect(() => {
    getMoney().then((res) => {
      setMoney(res.data);
    });
  }, []);

  useEffect(() => {
    const totalDenomination = document.querySelectorAll('.totalDenomination');
    for (let i = 0; i < totalDenomination.length; i++) {
      total += parseInt(totalDenomination[i].innerHTML);
    }
    setAccumulated(total);
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>NAME</TableCell>
            <TableCell align='right'>ID</TableCell>
            <TableCell align='right'>DENOMINATION</TableCell>
            <TableCell align='right'>AMOUNT</TableCell>
            <TableCell align='right'>TOTAL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createRows(money).map((element) => {
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
                <TableCell className='totalDenomination' align='right'>
                  {totalDenomination}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell align='center'>TOTAL</TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='right'>{accumulated}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoneyTable;
