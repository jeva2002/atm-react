import Container from '@mui/system/Container';
import './App.css';
import Login from './lib/views/Login';
import { useState, createContext, lazy, Suspense } from 'react';
import AdminSelectRol from './lib/views/AdminSelectRol';

const AdminDetail = lazy(() => import('./lib/views/AdminDetail'));
const AddMoney = lazy(() => import('./lib/views/AddMoney'));

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
      return _user.type === 'admin' ? <AdminDetail /> : <div>nichi</div>;
    case 4:
      return _user.type === 'admin' ? <AddMoney /> : <div>nichi</div>;
    default:
      return <div>error del view</div>;
  }
};

function App() {
  const [view, setView] = useState(1);
  const [user, setUser] = useState({
    id: 3,
    name: 'Juanito',
    cardNumber: 1234123412341234,
    securityCode: 123,
    type: 'admin',
  });

  return (
    <Suspense fallback={<div>Holi</div>}>
      <UserContext.Provider value={{ user, setUser, setView }}>
        <Container
          fixed
          maxWidth='lg'
          sx={{ marginTop: '10%', textAlign: 'center' }}
          className='App'
        >
          {selectView(view, user, setView)}
        </Container>
      </UserContext.Provider>
    </Suspense>
  );
}

export default App;
