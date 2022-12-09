import Typography from '@mui/material/Typography';
import LoginForm from '../components/LoginForm';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { Container } from '@mui/material';

const Login = () => {
  const [isUser, setIsUser] = useState(null);
  const { setUser, setDelivered } = useContext(UserContext);

  useEffect(() => {
    setDelivered();
    setUser();
  });

  return (
    <Container
      maxWidth={'xs'}
      component='main'
      sx={{ backgroundColor: '#ededed', padding: '80px', borderRadius: '10px' }}
    >
      <Typography variant='h3' component='h1'>
        Welcome to Teban ATM
      </Typography>
      <Typography variant='subtitle1' component='p'>
        Login to access
      </Typography>
      <LoginForm submitLogin={setIsUser} isUser={isUser} />
      {isUser === 'error' ? (
        <Typography variant='h5'>The card does not exist</Typography>
      ) : (
        ''
      )}
    </Container>
  );
};

export default Login;
