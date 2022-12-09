import { UserContext } from '../../App';
import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeliveredTable from '../components/DeliveredTable';

const Success = () => {
  const { user, delivered, setView } = useContext(UserContext);

  setTimeout(() => {
    setView(1);
  }, 10000);

  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Typography variant='h2' component='h1' textAlign='center'>
          Operation was success
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <Typography variant='h4' component='p' textAlign='center'>
          In a few seconds the cashier give you the money
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <DeliveredTable delivered={delivered} />
      </Grid>
      <Grid item lg={12}>
        <Typography variant='h5' component='p' textAlign='center'>
          Thanks {user.name} for using our cashier, in a few seconds the screen
          will reboot.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Success;
