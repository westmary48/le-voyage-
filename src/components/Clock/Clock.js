
// import React from 'react';

// import PropTypes from 'prop-types';

// class Clock extends React.Component {
//   static propTypes = {
//     date: PropTypes.string.isRequired,
//   };

//   state = {
//     days: 0,
//     hours: 0,
//     min: 0,
//   };

//   componentDidMount() {
//     // update every second
//     this.interval = setInterval(() => {
//       const date = this.calculateCountdown(this.props.date);
//       date ? this.setState(date) : this.stop();
//     }, 1000);
//   }

//   componentWillUnmount() {
//     this.stop();
//   }

//   calculateCountdown(endDate) {
//     let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

//     // clear countdown when date is reached
//     if (diff <= 0) return false;

//     const timeLeft = {
//       years: 0,
//       days: 0,
//       hours: 0,
//       min: 0,
//     };

//     // calculate time difference between now and expected date
//     if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
//       timeLeft.years = Math.floor(diff / (365.25 * 86400));
//       diff -= timeLeft.years * 365.25 * 86400;
//     }
//     if (diff >= 86400) { // 24 * 60 * 60
//       timeLeft.days = Math.floor(diff / 86400);
//       diff -= timeLeft.days * 86400;
//     }
//     if (diff >= 3600) { // 60 * 60
//       timeLeft.hours = Math.floor(diff / 3600);
//       diff -= timeLeft.hours * 3600;
//     }
//     if (diff >= 60) {
//       timeLeft.min = Math.floor(diff / 60);
//       diff -= timeLeft.min * 60;
//     }
//     return timeLeft;
//   }

//   stop() {
//     clearInterval(this.interval);
//   }

//   addLeadingZeros(value) {
//     value = String(value);
//     while (value.length < 2) {
//       value = `0${value}`;
//     }
//     return value;
//   }

//   render() {
//     const countDown = this.state;

//     return (
//       <div className="Countdown">
//         <span className="Countdown-col">
//           <span className="Countdown-col-element">
//               <strong>{this.addLeadingZeros(countDown.days)}</strong>
//               <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
//           </span>
//         </span>

//         <span className="Countdown-col">
//           <span className="Countdown-col-element">
//             <strong>{this.addLeadingZeros(countDown.hours)}</strong>
//             <span>Hours</span>
//           </span>
//         </span>


//         <span className="Countdown-col">
//           <span className="Countdown-col-element">
//             <strong>{this.addLeadingZeros(countDown.min)}</strong>
//             <span>Min</span>
//           </span>
//         </span>
//       </div>
//     );
//   }
// }

// export default Clock;

import React from 'react';
import './Clock.scss';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    // declare some initial state for following variables
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // get data prior to mounting
  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }

  // continually get data after mounting
  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }

  // Add leading 0 to values below 10
  leading0(num) {
    return num < 10 ? `0${num}` : num;
  }

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    this.setState({
      days,
      hours,
      minutes,
      seconds,
    });
  }

  render() {
    return (
      <div>
        <div className = "row">
        <div className = "col">
        <div className='Clock-days'>{this.leading0(this.state.days)} days</div>
        </div>
        <div className = "col">
        <div className='Clock-hours'>{this.leading0(this.state.hours)} hours</div>
        </div>
        <div className = "col">
        <div className='Clock-minutes'>{this.leading0(this.state.minutes)} minutes</div>
        </div>
        <div className = "col">
        <div className='Clock-seconds'>{this.leading0(this.state.seconds)} seconds</div>
        </div>
      </div>
      </div>
    );
  }
}

export default Clock;
