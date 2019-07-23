import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyFriends = uid => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const friends = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          friends.push(res.data[fbKey]);
        });
      }
      resolve(friends);
    })
    .catch(err => reject(err));
});

const getAllFriends = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/friends.json`)
    .then((result) => {
      const friendObject = result.data;
      const friendArray = [];
      if (friendObject != null) {
        Object.keys(friendObject).forEach((friendId) => {
          friendObject[friendId].id = friendId;
          friendArray.push(friendObject[friendId]);
        });
      }
      resolve(friendArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const addFriend = newFriend => axios.post(`${baseUrl}/friends.json`, newFriend);

const deleteFriend = friendId => axios.delete(`${baseUrl}/friends/${friendId}.json`);

const acceptFriendship = friendId => axios.patch(`${baseUrl}/friends/${friendId}.json`, { isAccepted: true, isPending: false });

export default {
  getMyFriends,
  addFriend,
  deleteFriend,
  acceptFriendship,
  getAllFriends,
};
