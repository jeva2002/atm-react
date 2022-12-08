import { getMoney, takeMoneyAtm } from './request';

export const giveMoney = async (_amount) => {
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
};
