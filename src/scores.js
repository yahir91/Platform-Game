/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import '@babel/polyfill';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdzt/scores/'

export const submitScore = async (userName, scoreValue) => {
  const data = { user: userName, score: parseInt(scoreValue) }; // eslint-disable-line 
  const parameters = {
    method: 'POST', mode: 'cors', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  };
  const promise = await fetch(url, parameters);
  const confirm = await promise.json();
  return confirm;
};

export const getScore = async () => {
  const parameters = {
    method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };
  const response = await fetch(url, parameters);
  const data = await response.json();
  return data;
};