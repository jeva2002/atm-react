import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Loading = () => {
  return (
    <Grid
      container
      component='main'
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='h2' component='h1'>
        Loading...
      </Typography>
    </Grid>
  );
};

export default Loading;
