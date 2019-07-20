import React from 'react';

import tripData from '../../helpers/data/tripData';

import './EditTrip.scss';

const defaultTrip = {
  name: '',
  description: '',
  imageUrl: '',
  startDate: '',
  endDate: '',
  city: '',
  country: '',
};

class EditTrip extends React.Component {
  state = {
    newTrip: defaultTrip,
  }

  componentDidMount() {
    const tripId = this.props.match.params.id;
    tripData.getSingleTrip(tripId)
      .then(tripPromise => this.setState({ newTrip: tripPromise.data }))
      .catch(err => console.error('could not find single trip', err));
  }

  formFieldStringState = (name, e) => {
    const tempTrip = { ...this.state.newTrip };
    tempTrip[name] = e.target.value;
    this.setState({ newTrip: tempTrip });
  }

  nameChange = e => this.formFieldStringState('name', e);

  descriptionChange = e => this.formFieldStringState('description', e);

  imageChange = e => this.formFieldStringState('image', e);

  startDateChange = e => this.formFieldStringState('startDate', e);

  endDateChange = e => this.formFieldStringState('endDate', e);

  cityChange = e => this.formFieldStringState('city', e);

  countryChange = e => this.formFieldStringState('country', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newTrip };
    const tripId = this.props.match.params.id;
    tripData.putTrip(saveMe, tripId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newTrip } = this.state;
    return (
      <div className="editTrip">
        <h1>Edit Trip</h1>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Trip 1"
              value={newTrip.name}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Girls trip"
              value={newTrip.description}
              onChange={this.descriptionChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image</label>
            <input
              type="img"
              className="form-control"
              id="imageUrl"
              placeholder="url"
              value={newTrip.imageUrl}
              onChange={this.imageUrlChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              placeholder="10/15/2019"
              value={newTrip.startDate}
              onChange={this.startDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="text"
              className="form-control"
              id="endDate"
              placeholder="10/20/2019"
              value={newTrip.endDate}
              onChange={this.endDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city"> City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="New York"
              value={newTrip.city}
              onChange={this.cityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="United Stated"
              value={newTrip.country}
              onChange={this.countryChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Trip</button>
        </form>
      </div>
    );
  }
}

export default EditTrip;
