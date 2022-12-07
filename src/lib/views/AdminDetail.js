import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useContext, lazy } from 'react';
import { UserContext } from '../../App';
const MoneyTable = lazy(() => import('../components/MoneyTable'));

const AdminDetail = () => {
  const { user, setView } = useContext(UserContext);

  return (
    <Grid
      container
      component='main'
      spacing='30'
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid
        item
        lg={4}
        xs={11}
        sx={{ backgroundColor: '#ededed', padding: '50px', borderRadius: '5%' }}
        component='section'
      >
        <Typography variant='h3' component='h1'>
          Welcome {user.name}!
        </Typography>
        <Typography variant='body1' component='p' padding={5}>
          This is the admin section so you can use it to add money to the ATM,
          and to watch the money available.
        </Typography>
        <Button
          type='button'
          sx={{ marginRight: '25px' }}
          variant='outlined'
          onClick={() => setView(1)}
        >
          Exit Admin
        </Button>
        <Button type='button' variant='contained' onClick={() => setView(4)}>
          Add Money
        </Button>
      </Grid>
      <Grid item lg={8} xs={12} component='section'>
        <MoneyTable />
      </Grid>
    </Grid>
  );
};

export default AdminDetail;
