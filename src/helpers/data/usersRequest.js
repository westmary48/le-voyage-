import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((result) => {
      const userObject = result.data;
      const userArray = [];
      if (userObject != null) {
        Object.keys(userObject).forEach((userId) => {
          userObject[userId].id = userId;
          userArray.push(userObject[userId]);
        });
      }
      resolve(userArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const createUser = user => axios.post(`${baseUrl}/users.json`, user);

const getUserByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const userObject = result.data;
      const userArray = [];
      if (userObject != null) {
        Object.keys(userObject).forEach((userId) => {
          userObject[userId].id = userId;
          userArray.push(userObject[userId]);
        });
      }
      resolve(userArray[0]);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getAllUsers,
  getUserByUid,
  createUser,
};
