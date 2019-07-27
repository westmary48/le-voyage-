import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import upcomingRequests from '../../helpers/data/upcomingRequests';

import './UpcomingForm.scss';


const defaultUpcoming = {
  uid: '',
  name: '',
  city: '',
  country: '',
  upcoming: '',
  startDate: '',
  endDate: '',
};

class UpcomingForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newUpcoming: defaultUpcoming,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUpcoming = { ...this.state.newUpcoming };
    tempUpcoming[name] = e.target.value;
    this.setState({ newUpcoming: tempUpcoming });
  }

  nameChange = e => this.formFieldStringState('name', e);

  cityChange = e => this.formFieldStringState('city', e);

  countryChange = e => this.formFieldStringState('country', e);

  startDateChange = e => this.formFieldStringState('startDate', e);

  endDateChange = e => this.formFieldStringState('endDate', e);

  cityChange = e => this.formFieldStringState('city', e);

  countryChange = e => this.formFieldStringState('country', e);


  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myUpcomingTrip = { ...this.state.newUpcoming };
    myUpcomingTrip.uid = authRequests.getCurrentUid();
    onSubmit(myUpcomingTrip);
    this.setState({ newUpcoming: defaultUpcoming });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      upcomingRequests.singleUpcoming(editId)
        .then((future) => {
          const newUpcoming = {
            upcoming: future.data.name,
            city: future.data.city,
            name: future.data.name,
            country: future.data.country,
            startDate: future.data.startDate,
            endDate: future.data.startDate,
            uid: future.data.uid,
          };
          this.setState({ newUpcoming });
        })
        .catch(err => console.error('error with singleUpcoming', err));
    }
  }

  render() {
    const { newUpcoming } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Upcoming Trip:</h2>;
      }
      return <h2>Add Upcoming Trip:</h2>;
    };
    return (
      <div className="upcoming-form col">
        {title()}
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              placeholder="Trip 1"
              value={newUpcoming.name}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              aria-describedby="cityHelp"
              placeholder="Nashville"
              value={newUpcoming.city}
              onChange={this.cityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              className="form-control"
              id="country"
              aria-describedby="countryHelp"
              placeholder="United States"
              value={newUpcoming.country}
              onChange={this.countryChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              aria-describedby="startDateHelp"
              placeholder="10/13/2000"
              value={newUpcoming.startDate}
              onChange={this.startDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="text"
              className="form-control"
              id="endDate"
              aria-describedby="endDateHelp"
              placeholder="10/23/2000"
              value={newUpcoming.endDate}
              onChange={this.endDateChange}
            />
          </div>
          <button className="btn btn-danger">Save Upcoming Trip</button>
        </form>
      </div>
    );
  }
}

export default UpcomingForm;
