import React from 'react';

import tripShape from '../../helpers/propz/tripShape';

import './FriendTripCard.scss';

{/* <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
    <div class="flip-card-back">
      <h1>John Doe</h1>
      <p>Architect & Engineer</p>
      <p>We love that guy</p>
    </div>
  </div>
</div> */}

class FriendTripCard extends React.Component {
  static propTypes = {
    trip: tripShape.tripCardShape,
  }

  render() {
    const { trip } = this.props;
    return (
      <div className="FriendTripCard col">
        {/* <div className="card"> */}
        <div class="flip-card-inner">
        <div class="flip-card-front">
          {/* <div className="card-body"> */}
            {/* <h5 className="card-title">{trip.name}</h5>
            <p className="card-text">{trip.description}</p> */}
            <img className = "card-img-friends" src = {trip.imageUrl} alt = "" />
            </div>
            <div class="flip-card-back">
            <h5 className="card-title">{trip.name}</h5>
            <p className="card-text">{trip.description}</p>
            <h6 className="card-title">{trip.startDate}</h6>
            <h6 className="card-title">{trip.endDate}</h6>
            <h6 className="card-title">{trip.city}</h6>
            <h6 className="card-title">{trip.country}</h6>
            </div>
        </div>
      </div>
    );
  }
}

export default FriendTripCard;
