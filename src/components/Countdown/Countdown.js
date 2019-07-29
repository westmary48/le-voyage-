// import React from 'react';

// import './Countdown.scss';

// class Countdown extends React.Component {
//   static propTypes = {
//     future: upcomingShape.upcomingCardShape,
//   }

//   state = {
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   }

//   componentWillMount() {
//     this.getTimeUntil(this.props.future);
//   }

//   componentDidMount() {
//     setInterval(() => this.getTimeUntil(this.props.deadLine), 1000);
//   }

//   leading0(num) {
//     return (num >= 0 && num < 10) ? `0${num}`:num;
//   }

//   getTimeUntil(deadLine) {
//     const time = Date.parse(deadLine) - Date.parse(new Date());
//     const seconds = Math.floor((time / 1000) % 60);
//     const minutes = Math.floor((time / 1000 / 60) % 60);
//     const hours = Math.floor((time / 1000 / 60 / 60) % 24);
//     const days = Math.floor(time / 1000 / 60 / 60 / 24);

//     this.setState({
// days, hours, minutes, seconds
// });
//   }

//   render() {
//     return (
// 			<div>
// 				<div className="Clock-days">{ this.leading0(this.state.days) } Days</div>
// 				<div className="Clock-hours">{ this.leading0(this.state.hours) } hours</div>
// 				<div className="Clock-minutes">{ this.leading0(this.state.minutes) } minutes</div>
// 				<div className="Clock-seconds">{ this.leading0(this.state.seconds) } seconds</div>
// 			</div>
//     );
//   }
// }
// export default Countdown;
