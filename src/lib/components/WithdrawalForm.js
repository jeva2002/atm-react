import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '../components/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import * as yup from 'yup';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { takeMoneyUser } from '../functions/request';
import { giveMoney } from '../functions/giveMoney';

const WithdrawalForm = () => {
  const { setView, user, setUser, setDelivered } = useContext(UserContext);
  return (
    <Formik
      initialValues={{ amount: '' }}
      validationSchema={yup.object().shape({
        amount: yup
          .number()
          .integer()
          .typeError('Only numeric values are allowed')
          .min(4, 'Value cannot be less than denomination'),
      })}
      validate={({ amount }) => {
        const errors = {};
        if (amount < 2000) {
          errors.amount = 'The minimum value is $2000';
        }
        if (amount > user.available) {
          errors.amount = 'The value can not exceeds the total available';
        }
        return errors;
      }}
      onSubmit={async ({ amount }) => {
        try {
          const newUser = { ...user };
          newUser.available -= amount;
          setUser(newUser);
          await takeMoneyUser({ available: newUser.available }, user.id);
          setDelivered('');
          giveMoney(amount, setDelivered);
          setView(4);
        } catch (e) {
          console.error(e);
        }
      }}
    >
      <Form>
        <Grid container textAlign='center' justifyContent='center' spacing={5}>
          <Grid item lg={10} md={12}>
            <TextField
              name='amount'
              label='Amount'
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              sx={{
                marginRight: '40px',
                padding: '10px 40px',
                fontSize: '18px',
              }}
              onClick={() => {
                setView(1);
              }}
            >
              Exit
            </Button>
            <Button
              variant='contained'
              sx={{ padding: '10px 40px', fontSize: '18px' }}
              type='submit'
            >
              Withdrawal
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default WithdrawalForm;
