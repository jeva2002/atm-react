import Typography from '@mui/material/Typography';
import Container from '@mui/system/Container';
import AddMoneyForm from '../components/AddMoneyForm';

const AddMoney = () => {
  return (
    <Container component='main'>
      <Typography
        variant='h3'
        component='h1'
        sx={{ position: 'relative', bottom: '50px' }}
      >
        How much money do you want to add?
      </Typography>
      <AddMoneyForm />
    </Container>
  );
};

export default AddMoney;
