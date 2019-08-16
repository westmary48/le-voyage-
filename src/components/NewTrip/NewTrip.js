import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import FileUploader from 'react-firebase-file-uploader';

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
  lat: '',
  long: '',
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

  startDateChange = e => this.formFieldStringState('startDate', e);

  endDateChange = e => this.formFieldStringState('endDate', e);

  cityChange = e => this.formFieldStringState('city', e);

  countryChange = e => this.formFieldStringState('country', e);

  latChange = e => this.formFieldStringState('lat', e);

  longChange = e => this.formFieldStringState('long', e);

  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
    });
    firebase.storage().ref('images').child(filename).getDownloadURL()
      .then((url) => {
        this.setState({ imageUrl: url });
        this.props.imageUrl(url);
      })
      .catch(err => console.error('no image url', err));
  };

  formSubmit = (e) => {
    e.preventDefault();
    const saveForm = { ...this.state.newTrip };
    saveForm.uid = firebase.auth().currentUser.uid;
    saveForm.imageUrl = this.state.imageUrl;
    tripData.postTrip(saveForm)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('unable to save', err));
  }

  render() {
    const { newTrip } = this.state;
    return (
      <div className="newTrip-container">
        <h1 className = "newtrip-title">ADD NEW TRIP</h1>
        <form onSubmit={this.formSubmit}>
        <div class = "leftside">
          <div className="form-group">
            <label htmlFor="name"><strong>NAME</strong></label>
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
            <label htmlFor="description"><strong>DESCRIPTION</strong></label>
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
                <label htmlFor="itemImage"><strong>IMAGE</strong></label>
                <FileUploader
                  accept='image/*'
                  name='image'
                  storageRef={firebase.storage().ref('images/')}
                  onUploadSuccess={this.handleUploadSuccess}
                />
              </div>
              <div className="form-group">
            <label htmlFor="startDate"><strong>START DATE</strong></label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              placeholder="10/20/2019"
              value={newTrip.startDate}
              onChange={this.startDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate"><strong>END DATE</strong></label>
            <input
              type="text"
              className="form-control"
              id="endDate"
              placeholder="10/20/2019"
              value={newTrip.endDate}
              onChange={this.endDateChange}
            />
          </div>
          </div>
          <div class = "rightside">
          <div className="form-group">
            <label htmlFor="city"><strong>CITY</strong></label>
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
            <label htmlFor="country"><strong>COUNTRY</strong></label>
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="United States"
              value={newTrip.country}
              onChange={this.countryChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lat"><strong>LATITUDE</strong></label>
            <input
              type="text"
              className="form-control"
              id="lat"
              placeholder="48.8566"
              value={newTrip.lat}
              onChange={this.latChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="long"><strong>LONGITUDE</strong></label>
            <input
              type="text"
              className="form-control"
              id="long"
              placeholder="23.3522"
              value={newTrip.long}
              onChange={this.longChange}
            />
          </div>
          </div>
          <button type="submit" className="btn btn-primary save">Save Trip</button>
        </form>
      </div>
    );
  }
}

export default NewTrip;
