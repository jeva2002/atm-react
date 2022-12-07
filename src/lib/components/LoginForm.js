import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from './TextField';
import { login } from '../functions/request';
import { UserContext } from '../../App';
import { useContext } from 'react';

const INITIAL_FORM_STATE = {
  cardNumber: '',
  securityCode: '',
};

const FORM_VALIDATION = yup.object().shape({
  cardNumber: yup
    .number()
    .integer()
    .required('Please enter a valid card number')
    .typeError('Please enter a valid card number'),
  securityCode: yup
    .number()
    .integer()
    .required('Please enter a valid security code')
    .typeError('Please enter a valid security code'),
});

const LoginForm = ({ submitLogin }) => {
  const { setUser, setView } = useContext(UserContext);
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={async (values) => {
        const request = await login();
        if (request.status >= 200 && request.status < 300) {
          request.data.forEach((user) => {
            if (
              user.cardNumber === parseInt(values.cardNumber) &&
              user.securityCode === parseInt(values.securityCode)
            ) {
              setUser(user);
              setView((prev) => prev + 1);
            } else submitLogin('error');
          });
        } else submitLogin(false);
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='cardNumber'
              label='Card Number'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='securityCode'
              label='Security Code'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant='contained' type='submit'>
              Log in
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default LoginForm;
