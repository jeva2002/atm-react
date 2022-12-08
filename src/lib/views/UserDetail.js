import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../App';
import { useContext } from 'react';
import WithdrawalForm from '../components/WithdrawalForm';

const UserDetail = () => {
  const { user } = useContext(UserContext);
  return (
    <Grid
      container
      component='main'
      width='900px'
      textAlign='center'
      justifyContent='center'
      alignItems='center'
      spacing={5}
    >
      <Grid item lg={8}>
        <Typography variant='h2' component='h1' marginBottom='10px'>
          Welcome {user.name}
        </Typography>
        <Typography variant='subtitle1' component='p'>
          then you can see the total available in your account and you can make
          your withdrawal if you consider it
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <Typography variant='h4' component='h2'>
          Total Available: {user.available}
        </Typography>
      </Grid>
      <Grid item>
        <WithdrawalForm />
      </Grid>
    </Grid>
  );
};

export default UserDetail;
