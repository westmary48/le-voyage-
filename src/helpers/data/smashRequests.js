
import friendsData from './friendData';

import usersRequest from './usersRequest';

const usersAndFriends = currentUid => new Promise((resolve, reject) => {
  const users = [];
  usersRequest.getAllUsers()
    .then((usrs) => {
      friendsData.getAllFriends()
        .then((friends) => {
          console.error(friends);
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

export default { usersAndFriends };
