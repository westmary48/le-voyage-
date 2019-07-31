import React from 'react';
import './UpcomingTrips.scss';

import { FormGroup, FormControl, Button } from 'react-bootstrap';
import upcomingRequests from '../../helpers/data/upcomingRequests';
import authRequests from '../../helpers/data/authRequests';
import smashRequests from '../../helpers/data/smashRequests';

import UpcomingItem from '../UpcomingItem/UpcomingItem';
import UpcomingForm from '../UpcomingForm/UpcomingForm';
import Clock from '../Clock/Clock';


class UpcomingTrips extends React.Component {
  state = {
    upcoming: [],
    isEditing: false,
    editId: '-1',
    // deadline: 'December 25 2017',
    // newDeadline: '',
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

  // updateDeadline() {
  //   if (isNaN(Date.parse(this.state.newDeadline)) || this.state.newDeadline === '') {
  //     this.setState({ deadline: this.state.deadline });
  //   } else {
  //     this.setState({ deadline: this.state.newDeadline });
  //   }
  // }

  // updateNewDeadline(event) {
  //   this.setState({ newDeadline: event.target.value });
  // }


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
          {/* <div className="app-title">Countdown To {this.state.deadline}</div> */}
        {/* <Clock deadline={this.state.deadline} /> */}
        {/* <form className="app-form"> */}
          {/* <FormGroup> */}
            {/* <FormControl className="deadline-input" */}
              {/* placeholder='Enter a new date' */}
              {/* onChange={event => this.updateNewDeadline(event)} */}
            {/* /> */}
            {/* <Button bsStyle="primary" block onClick={() => this.updateDeadline()}>Submit</Button> */}
          {/* </FormGroup> */}
        {/* </form> */}
      </div>
        </div>
    );
  }
}

export default UpcomingTrips;


// import React, { Component } from 'react';
// import './App.css';
// import Clock from './Clock';
// import {FormGroup, FormControl, Button} from 'react-bootstrap';

// class App extends Component {
//   constructor(props) {
//     super(props);

//     //Bound event handlers


//   this.state = {
//     deadline: 'December 25 2017',
//     newDeadline: ''
//   }
// }

// updateDeadline() {
//   if (isNaN(Date.parse(this.state.newDeadline)) || this.state.newDeadline === '') {
//     this.setState({deadline: this.state.deadline});
//   } else {
//     this.setState({deadline: this.state.newDeadline})
//   }
// }

// updateNewDeadline(event) {
//   this.setState({newDeadline: event.target.value})
// }

// render() {
//   return (
//     <div className="app">
//       <div className="app-title">Countdown To {this.state.deadline}</div>
//       <Clock deadline={this.state.deadline} />
//       <form className="app-form">
//         <FormGroup>
//           <FormControl className="deadline-input"
//             placeholder='Enter a new date'
//             onChange={this.updateNewDeadline}
//           />
//           <Button bsStyle="primary" block onClick={this.updateDeadline}>Submit</Button>
//         </FormGroup>
//       </form>
//     </div>
//   )
// }
