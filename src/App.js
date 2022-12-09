import Container from '@mui/system/Container';
import './App.css';
import Login from './lib/views/Login';
import { useState, createContext, lazy, Suspense } from 'react';
import AdminSelectRol from './lib/views/AdminSelectRol';
import UserDetail from './lib/views/UserDetail';
import { Typography } from '@mui/material';

const AdminDetail = lazy(() => import('./lib/views/AdminDetail'));
const AddMoney = lazy(() => import('./lib/views/AddMoney'));
const Success = lazy(() => import('./lib/views/Success'));

export const UserContext = createContext(null);

const selectView = (_view, _user, _setView) => {
  switch (_view) {
    case 1:
      return <Login />;
    case 2:
      if (_user.type === 'admin') return <AdminSelectRol />;
      else {
        _setView(3);
        break;
      }
    case 3:
      return _user.type === 'admin' ? <AdminDetail /> : <UserDetail />;
    case 4:
      return _user.type === 'admin' ? <AddMoney /> : <Success />;
    default:
      return <div>error del view</div>;
  }
};

function App() {
  const [view, setView] = useState(1);
  const [user, setUser] = useState();
  const [delivered, setDelivered] = useState();

  return (
    <Suspense
      fallback={
        <Typography variant='h2' component='h1'>
          {' '}
          Loading...
        </Typography>
      }
    >
      <UserContext.Provider
        value={{ user, setUser, setView, delivered, setDelivered }}
      >
        <Container
          fixed
          maxWidth='lg'
          sx={{
            marginTop: '5%',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className='App'
        >
          {selectView(view, user, setView)}
        </Container>
      </UserContext.Provider>
    </Suspense>
  );
}

export default App;
