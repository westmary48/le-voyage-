import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyTrips = uid => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/trips.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const trips = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          trips.push(res.data[fbKey]);
        });
      }
      resolve(trips);
    })
    .catch(err => reject(err));
});

export default {
  getMyTrips,
};
