import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import tripData from '../../helpers/data/tripData';

import './NewTrip.scss';

const defaultTrip = {
  name: '',
  description: '',
  imageUrl: '',
  startDate: '',
  endDate: '',
  city: '',
  country: '',
};

class NewTrip extends React.Component {
  state = {
    newTrip: defaultTrip,
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
    const saveForm = { ...this.state.newTrip };
    saveForm.uid = firebase.auth().currentUser.uid;
    tripData.postTrip(saveForm)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newTrip } = this.state;
    return (
      <div className="Newtrip">
        <h1>New Trip</h1>
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

export default NewTrip;
