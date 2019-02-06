/* eslint-disable no-param-reassign */
// noinspection ES6CheckImport
import { padStart } from 'lodash';

function getMonth(date, key) {
  if (date.getDay() > 27) {
    key += ''.concat(padStart(date.getMonth() + 2, 2, '0'));
  } else {
    key += ''.concat(padStart(date.getMonth() + 1, 2, '0'));
  }
  return key;
}

function getMoneyExpression(money = 0) {
  return `$${money.toFixed(2)}`;
}

function getYear(date, key) {
  const month = date.getMonth() + 1;
  if (month < 12) {
    key = date.getFullYear();
  } else {
    key = date.getFullYear() + 1;
  }
  return key;
}

function getMonthName(month) {
  const monthNames = [
    'months.1', 'months.2', 'months.3', 'months.4', 'months.5', 'months.6',
    'months.7', 'months.8', 'months.9', 'months.10', 'months.11', 'months.12',
  ];
  return monthNames[month - 1];
}

const getCurrentDateForFee = () => {
  const date = new Date();
  let key = '';
  key = getYear(date, key);
  key = getMonth(date, key);
  return key;
};

const paymentUtil = {
  getCurrentDateForFee,
  getMonthName,
  getMoneyExpression,
};

export default paymentUtil;
