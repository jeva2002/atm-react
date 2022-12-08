import Container from '@mui/system/Container';
import './App.css';
import Login from './lib/views/Login';
import { useState, createContext, lazy, Suspense } from 'react';
import AdminSelectRol from './lib/views/AdminSelectRol';
import UserDetail from './lib/views/UserDetail';
import Success from './lib/views/Success';

const AdminDetail = lazy(() => import('./lib/views/AdminDetail'));
const AddMoney = lazy(() => import('./lib/views/AddMoney'));

export const UserContext = createContext(null);

const selectView = (_view, _user, _setView, _setUser) => {
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
  const [user, setUser] = useState({});

  return (
    <Suspense fallback={<div>Holi</div>}>
      <UserContext.Provider value={{ user, setUser, setView }}>
        <Container
          fixed
          maxWidth='lg'
          sx={{
            marginTop: '10%',
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
