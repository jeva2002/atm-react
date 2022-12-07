import Grid from '@mui/material/Grid';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextField from './TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { addMoney, getMoney } from '../functions/request';

const INITIAL_FORM_STATE = {
  aHundred: '',
  fifty: '',
  twenty: '',
  ten: '',
  five: '',
  two: '',
};

const FORM_VALIDATION = yup.object().shape({
  aHundred: yup
    .number()
    .integer()
    .min(6, 'Value cannot be less than denomination')
    .typeError('Only numeric values are allowed'),
  fifty: yup
    .number()
    .integer()
    .min(5, 'Value cannot be less than denomination')
    .typeError('Only numeric values are allowed'),
  twenty: yup
    .number()
    .integer()
    .min(5, 'Value cannot be less than denomination')
    .typeError('Only numeric values are allowed'),
  ten: yup
    .number()
    .integer()
    .min(5, 'Value cannot be less than denomination')
    .typeError('Only numeric values are allowed'),
  five: yup
    .number()
    .integer()
    .min(4, 'Value cannot be less than denomination')
    .typeError('Only numeric values are allowed'),
  two: yup
    .number()
    .integer()
    .typeError('Only numeric values are allowed')
    .min(4, 'Value cannot be less than denomination'),
});

const round = (value, denomination) => {
  return value % denomination === 0
    ? [value, 0]
    : [value - (value % denomination), value % denomination];
};

const amountValidation = (_aHundred, _fifty, _twenty, _ten, _five, _two) => {
  const validated = [];
  if (_aHundred >= 100000)
    validated.push([1, ...round(parseInt(_aHundred), 100000)]);
  if (_fifty >= 50000) validated.push([2, ...round(parseInt(_fifty), 50000)]);
  if (_twenty >= 20000) validated.push([3, ...round(parseInt(_twenty), 20000)]);
  if (_ten >= 10000) validated.push([4, ...round(parseInt(_ten), 10000)]);
  if (_five >= 5000) validated.push([5, ...round(parseInt(_five), 5000)]);
  if (_two >= 2000) validated.push([6, ...round(parseInt(_two), 2000)]);
  return validated;
};

const AddMoneyForm = () => {
  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      validate={() => {}}
      onSubmit={async ({ aHundred, fifty, twenty, ten, five, two }) => {
        try {
          const values = [
            ...amountValidation(aHundred, fifty, twenty, ten, five, two),
          ];
          console.log(values);
          if (values.length) {
            const denominations = await (await getMoney()).data;
            values.forEach(async ([id, amount]) => {
              const denomination = denominations.find(
                (denomination) => denomination.id === id
              );
              denomination.amount += amount / denomination.denomination;
              setTimeout(() => {
                try {
                  addMoney(denomination, id);
                } catch (e) {
                  console.error(e);
                }
              }, 2000);
            });
          }
        } catch (e) {
          console.error(e);
        }
      }}
    >
      <Form>
        <Grid container spacing='20'>
          <Grid item xs={2} sx={{ marginTop: '15px' }}>
            <Typography variant='subtitle1' component='label'>
              A Thousand Hundred
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              name='aHundred'
              variant='outlined'
              placeholder='00000000'
            />
          </Grid>
          <Grid item xs={2} sx={{ marginTop: '15px' }}>
            <Typography variant='subtitle1' component='label'>
              Fifty Thousand
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField name='fifty' variant='outlined' placeholder='00000000' />
          </Grid>
          <Grid item xs={2} sx={{ marginTop: '15px' }}>
            <Typography variant='subtitle1' component='label'>
              Twenty Thousand
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              name='twenty'
              variant='outlined'
              placeholder='00000000'
            />
          </Grid>
          <Grid item xs={2} sx={{ marginTop: '15px' }}>
            <Typography variant='subtitle1' component='label'>
              Ten Thousand
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField name='ten' variant='outlined' placeholder='00000000' />
          </Grid>
          <Grid item xs={2} sx={{ marginTop: '15px' }}>
            <Typography variant='subtitle1' component='label'>
              Five Thousand
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField name='five' variant='outlined' placeholder='00000000' />
          </Grid>
          <Grid item xs={2} sx={{ marginTop: '15px' }}>
            <Typography variant='subtitle1' component='label'>
              Two Thousand
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField name='two' variant='outlined' placeholder='00000000' />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              sx={{ padding: '15px 20px', fontSize: '20px' }}
            >
              Add Money
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AddMoneyForm;
