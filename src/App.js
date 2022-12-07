import Container from '@mui/system/Container';
import './App.css';
import Login from './lib/views/Login';
import { useState, createContext } from 'react';
import AdminDetail from './lib/views/AdminDetail';
import AddMoney from './lib/views/AddMoney';

export const UserContext = createContext(null);

const selectView = (_view, _user) => {
  switch (_view) {
    case 1:
      return <Login />;
    case 2:
      return _user.type === 'admin' ? <AdminDetail /> : <div>nichi</div>;
    case 3:
      return _user.type === 'admin' ? <AddMoney /> : <div>nichi</div>;
    default:
      return <div>revisar error</div>;
  }
};

function App() {
  const [view, setView] = useState(3);
  const [user, setUser] = useState({
    id: 3,
    name: 'Juanito',
    cardNumber: 1234123412341234,
    securityCode: 123,
    type: 'admin',
  });

  return (
    <UserContext.Provider value={{ user, setUser, setView }}>
      <Container
        fixed
        maxWidth='lg'
        sx={{ marginTop: '10%', textAlign: 'center' }}
        className='App'
      >
        {selectView(view, user)}
      </Container>
    </UserContext.Provider>
  );
}

export default App;
