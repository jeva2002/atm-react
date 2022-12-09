import { getMoney, takeMoneyAtm } from './request';

export const giveMoney = async (_amount, _setDelivered) => {
  const moneyDelivered = [
    {
      id: 1,
      denomination: 100000,
      amount: 0,
      name: 'A Hundred Thousand',
    },
    {
      id: 2,
      denomination: 50000,
      amount: 0,
      name: 'Fifty Thousand',
    },
    {
      id: 3,
      denomination: 20000,
      amount: 0,
      name: 'Twenty Thousand',
    },
    {
      id: 4,
      denomination: 10000,
      amount: 0,
      name: 'Ten Thousand',
    },
    {
      id: 5,
      denomination: 5000,
      amount: 0,
      name: 'Five Thousand',
    },
    {
      id: 6,
      denomination: 2000,
      amount: 0,
      name: 'Two Thousand',
    },
  ];
  const moneyAvailable = await (await getMoney()).data;
  let flag = true;
  while (_amount >= 2000 && flag) {
    for (let i = 0; i < moneyAvailable.length; i++) {
      while (
        _amount >= moneyAvailable[i].denomination &&
        moneyAvailable[i].amount > 0
      ) {
        moneyAvailable[i].amount -= 1;
        _amount -= moneyAvailable[i].denomination;
        moneyDelivered[i].amount += 1;
      }
      if (
        moneyAvailable[i] === moneyAvailable[5] &&
        moneyAvailable[i].amount === 0
      ) {
        flag = false;
      }
      await takeMoneyAtm(moneyAvailable[i], moneyAvailable[i].id);
    }
  }
  _setDelivered(moneyDelivered);
};
