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

const getSingleTrip = tripId => axios.get(`${baseUrl}/trips/${tripId}.json`);

const deleteTrip = tripId => axios.delete(`${baseUrl}/trips/${tripId}.json`);

const postTrip = newTrip => axios.post(`${baseUrl}/trips.json`, newTrip);

const putTrip = (updatedTrip, tripId) => axios.put(`${baseUrl}/trips/${tripId}.json`, updatedTrip);

export default {
  getMyTrips,
  getSingleTrip,
  deleteTrip,
  postTrip,
  putTrip,
};
