import React from 'react';
import './Clock.scss';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentWillMount() {
    this.getTimeUntil(this.props.deadline);
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }

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
      <div className = "clock-container">
        <div className = "col">
        <div className = "row">
        <div className='threeD'>{this.leading0(this.state.days)} days</div>
        </div>
        <div className = "row">
        <div className='threeD'>{this.leading0(this.state.hours)} hours</div>
        </div>
        <div className = "row">
        <div className='threeD'>{this.leading0(this.state.minutes)} minutes</div>
        </div>
        <div className = "row">
        <div className='threeD'>{this.leading0(this.state.seconds)} seconds</div>
        </div>
      </div>
      </div>
    );
  }
}

export default Clock;
