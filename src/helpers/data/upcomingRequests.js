import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllUpcomingTrips = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/upcoming.json`)
    .then((result) => {
      const upcomingObject = result.data;
      const upcomingArray = [];
      if (upcomingObject != null) {
        Object.keys(upcomingObject).forEach((futureId) => {
          upcomingObject[futureId].id = futureId;
          upcomingArray.push(upcomingObject[futureId]);
        });
      }
      resolve(upcomingArray);
    })
    .catch((error) => {
      reject(error);
    });
});
const deleteUpcoming = futureId => axios.delete(`${baseUrl}/upcoming/${futureId}.json`);

const postUpcoming = newUpcoming => axios.post(`${baseUrl}/upcoming.json`, newUpcoming);

const singleUpcoming = futureId => axios.get(`${baseUrl}/upcoming/${futureId}.json`);

const updateUpcoming = (futureId, future) => axios.put(`${baseUrl}/upcoming/${futureId}.json`, future);

export default {
  getAllUpcomingTrips,
  deleteUpcoming,
  postUpcoming,
  singleUpcoming,
  updateUpcoming,
};
