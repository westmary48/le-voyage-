
import friendsData from './friendData';

import usersRequest from './usersRequest';

import tripData from './tripData';

import upcomingRequests from './upcomingRequests';

const usersAndFriends = currentUid => new Promise((resolve, reject) => {
  const users = [];
  usersRequest.getAllUsers()
    .then((usrs) => {
      friendsData.getAllFriends()
        .then((friends) => {
          usrs.forEach((user) => {
            const newUser = { ...user };
            newUser.isAccepted = false;
            newUser.isPending = false;
            newUser.friendRequest = '';
            newUser.friendRequestId = '';
            friends.forEach((friend) => {
              if (friend.uid === currentUid && friend.friendUid === newUser.uid) {
                newUser.isAccepted = friend.isAccepted;
                newUser.isPending = friend.isPending;
                newUser.friendRequest = 'me';
                newUser.friendRequestId = friend.id;
              } else if (friend.friendUid === currentUid && newUser.uid === friend.uid) {
                newUser.isAccepted = friend.isAccepted;
                newUser.isPending = friend.isPending;
                newUser.friendRequest = 'them';
                newUser.friendRequestId = friend.id;
              }
            });
            if (newUser.uid !== currentUid) {
              users.push(newUser);
            }
          });
          resolve(users);
        });
    })
    .catch(err => reject(err));
});

const getTripsFromMeAndFriends = uid => new Promise((resolve, reject) => {
  let allTrips = [];
  tripData.getAllTrips()
    .then((tripz) => {
      allTrips = tripz;
      friendsData.getMyFriends(uid).then((friendsArray) => {
        friendsArray.push(uid);
        const tripsToKeep = allTrips.filter(f => friendsArray.includes(f.uid));
        resolve(tripsToKeep);
      });
    })
    .catch(err => reject(err));
});

const getUpcomingFromMeAndFriends = uid => new Promise((resolve, reject) => {
  let allUpcoming = [];
  upcomingRequests.getAllUpcomingTrips()
    .then((upcomingz) => {
      allUpcoming = upcomingz;
      friendsData.getMyFriends(uid).then((friendsArray) => {
        friendsArray.push(uid);
        const upcomingToKeep = allUpcoming.filter(f => friendsArray.includes(f.uid));
        resolve(upcomingToKeep);
      });
    })
    .catch(err => reject(err));
});


export default { usersAndFriends, getTripsFromMeAndFriends, getUpcomingFromMeAndFriends };
