import axios from 'axios';

const BASE_REQUEST = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
});

const login = async () => {
  return await BASE_REQUEST.get('users');
};

const getMoney = async () => {
  return await BASE_REQUEST.get('money');
};

const addMoney = async (_body, _id) => {
  return await BASE_REQUEST.patch(`money/${_id}`, _body);
};

export { login, getMoney, addMoney };
