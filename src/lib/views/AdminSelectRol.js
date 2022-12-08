import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { UserContext } from '../../App';

const AdminSelectRol = () => {
  const { setView, setUser, user } = useContext(UserContext);

  const setUserRol = () => {
    const newRol = {
      ...user,
    };
    newRol.type = 'user';
    setUser(newRol);
    setView(3);
  };
  return (
    <main>
      <Typography variant='h3' component='h1' marginBottom='100px'>
        Select rol
      </Typography>
      <Grid
        container
        component='section'
        spacing='40'
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid item lg={6}>
          <Button
            variant='contained'
            color='primary'
            sx={{ fontSize: '30px', padding: '40px 80px' }}
            onClick={() => setView(3)}
          >
            Admin
          </Button>
        </Grid>
        <Grid item lg={6}>
          <Button
            variant='contained'
            color='secondary'
            sx={{ fontSize: '30px', padding: '40px 80px' }}
            onClick={() => setUserRol()}
          >
            User
          </Button>
        </Grid>
      </Grid>
    </main>
  );
};

export default AdminSelectRol;
