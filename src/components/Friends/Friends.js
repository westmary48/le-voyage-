/* eslint-disable array-callback-return */
import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import smashRequests from '../../helpers/data/smashRequests';

import friendRequest from '../../helpers/data/friendData';

import authRequests from '../../helpers/data/authRequests';

import './Friends.scss';
import FriendTripCard from '../FriendTripCard/FriendTripCard';

class Friends extends React.Component {
state = {
  undiscoveredFriends: [],
  pendingFriendships: [],
  myFriends: [],
  trips: [],
}

userMegaSmash = () => {
  const uid = authRequests.getCurrentUid();
  smashRequests.usersAndFriends(uid)
    .then((users) => {
      const undiscoveredFriends = users.filter(x => x.friendRequest === '');
      const pendingFriendships = users.filter(x => x.friendRequest !== '' && x.isPending);
      const myFriends = users.filter(x => x.isAccepted);

      this.setState({ undiscoveredFriends, pendingFriendships, myFriends });
    })
    .catch(err => console.error('err in usersAndFriends', err));
}

getFriendsTrips = () => {
  const uid = authRequests.getCurrentUid();
  smashRequests.getTripsFromMeAndFriends(uid)
    .then((trips) => {
      this.setState({ trips });
    })
    .catch(err => console.error('error with trips GET', err));
}

componentDidMount() {
  this.userMegaSmash();
  this.getFriendsTrips();
}

friendTrips = (e) => {
  e.preventDefault();
  const tripId = e.target.id;
  smashRequests.getTripsFromMeAndFriends(tripId)
    .then(() => {
      this.getFriendsTrips();
    })
    .catch(err => console.error('problem getting friends trips', err));
};

addNewFriend = (e) => {
  e.preventDefault();
  const newFriend = {
    friendUid: e.target.id,
    isAccepted: false,
    isPending: true,
    uid: authRequests.getCurrentUid(),
  };
  friendRequest.addFriend(newFriend)
    .then(() => {
      this.userMegaSmash();
    })
    .catch(err => console.error('problem adding new friend', err));
};

friendshipOver = (e) => {
  e.preventDefault();
  const friendId = e.target.id;
  friendRequest.deleteFriend(friendId)
    .then(() => {
      this.userMegaSmash();
    })
    .catch(err => console.error('problem deleting friend', err));
};

confirmFriendship = (e) => {
  e.preventDefault();
  const friendId = e.target.id;
  friendRequest.acceptFriendship(friendId)
    .then(() => {
      this.userMegaSmash();
    })
    .catch(err => console.error('problem deleting friend', err));
}

render() {
  const {
    undiscoveredFriends,
    pendingFriendships,
    myFriends,
  } = this.state;
  const { uid } = firebase.auth().currentUser;
  const friendsTrips = this.state.trips.filter(a => a.uid !== uid);
  const undiscoveredFriendCards = undiscoveredFriends.map(undiscovered => (
    <div className="card border-dark" key={undiscovered.id}>
      <h5 className="card-header-undiscovered">{undiscovered.userName}</h5>
      <div className="card-body">
        <div className="double-wide">
          <img className="profile-img" src={undiscovered.photo} alt={undiscovered.userName}/>
        </div>
        <div className="double-wide">
          <button className="btn btn-primary request-button" id={undiscovered.uid} onClick={this.addNewFriend}>Request</button>
        </div>
      </div>
    </div>
  ));
  const pendingFriendshipsCards = pendingFriendships.map(pending => (
    <div className="card border-dark" key={pending.id}>
      <h5 className="card-header-pending">{pending.userName}</h5>
      <div className="card-body">
        <div className="double-wide">
          <img className="profile-img" src={pending.photo} alt={pending.userName}/>
        </div>
        <div className="double-wide">
          { pending.friendRequest === 'me'
            ? <p>Waiting</p>
            : <div>
              <button className="btn btn-primary" id={pending.friendRequestId} onClick={this.confirmFriendship}>Accept!</button>
              <button className="btn btn-danger" id={pending.friendRequestId} onClick={this.friendshipOver}>Nope</button>
            </div>}
        </div>
      </div>
    </div>
  ));
  const myFriendsCards = myFriends.map(mine => (
    <div className="card border-dark" key={mine.id}>
      <h5 className="card-header-friends">{mine.userName}</h5>
      <div className="card-body">
        <div className="double-wide">
          <img className="profile-img" src={mine.photo} alt={mine.userName}/>
        </div>
        <div className="double-wide">
          <button className="btn btn-danger" id={mine.friendRequestId} onClick={this.friendshipOver}>Delete</button>
        </div>
      </div>
    </div>
  ));
  const myFriendsTripsCards = friendsTrips.map(trip => (
    <FriendTripCard
    key={trip.id}
    trip={trip}
  />
  ));
  return (
<div className="Friends text-center col">
        <h1 className = "friends-title">Friends</h1>
        <div className="row">
          <div className="col-4">
            <h3 className = "friends-sub"><strong>Undiscovered Friends</strong></h3>
            <hr/>
            { undiscoveredFriendCards }
          </div>
          <div className="col-4">
            <h3 className = "friends-sub"><strong>Pending Friendships</strong></h3>
            <hr/>
            { pendingFriendshipsCards }
          </div>
          <div className="col-4">
            <h3 className = "friends-sub"><strong>My Friends</strong></h3>
            <hr/>
            { myFriendsCards }
          </div>
          <div className="row">
            <div className = "col">
            <h3 className = "friends-sub"><strong>My Friends Trips</strong></h3>
            <div className= "col">
              <div className = "row">
            { myFriendsTripsCards }
            </div>
            </div>
          </div>
          </div>
          </div>
        </div>
  );
}
}

export default Friends;
