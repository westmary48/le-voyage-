import React from 'react';
import './UpcomingTrips.scss';

import upcomingRequests from '../../helpers/data/upcomingRequests';
import authRequests from '../../helpers/data/authRequests';
import smashRequests from '../../helpers/data/smashRequests';

import UpcomingItem from '../UpcomingItem/UpcomingItem';
import UpcomingForm from '../UpcomingForm/UpcomingForm';

class UpcomingTrips extends React.Component {
  state = {
    upcoming: [],
    isEditing: false,
    editId: '-1',
  }

  getUpcoming = () => {
    const uid = authRequests.getCurrentUid();
    smashRequests.getUpcomingFromMeAndFriends(uid)
      .then((upcoming) => {
        this.setState({ upcoming });
      })
      .catch(err => console.error('error with upcoming GET', err));
  }

  componentDidMount() {
    this.getUpcoming();
  }

  deleteUpcoming = (futureId) => {
    upcomingRequests.deleteUpcoming(futureId)
      .then(() => {
        this.getUpcoming();
      })
      .catch(err => console.error('error with delete', err));
  }

  formSubmitUpcoming = (newUpcoming) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      upcomingRequests.updateUpcoming(editId, newUpcoming)
        .then(() => {
          this.setState({ isEditing: false, editId: '-1' });
          this.getUpcoming();
        })
        .catch(err => console.error('error with upcoming post', err));
    } else {
      upcomingRequests.postUpcoming(newUpcoming)
        .then(() => {
          this.getUpcoming();
        })
        .catch(err => console.error('error with upcoming post', err));
    }
  }

  render() {
    const { upcoming, isEditing, editId } = this.state;
    const passUpcomingToEdit = futureId => this.setState({ isEditing: true, editId: futureId });
    const upcomingItemComponents = upcoming.map(future => (
      <UpcomingItem
        future={future}
        key={future.id}
        deleteUpcoming={this.deleteUpcoming}
        passUpcomingToEdit={passUpcomingToEdit}
      />
    ));

    return (
      <div className="Upcoming text-center col">
        <div className="row">
          <div className="col">
            <div>{ upcomingItemComponents }</div>
          </div>
          <div className="col">
            <UpcomingForm
              onSubmit={this.formSubmitUpcoming}
              isEditing={isEditing}
              editId={editId}
            />
          </div>
      </div>
        </div>
    );
  }
}

export default UpcomingTrips;
