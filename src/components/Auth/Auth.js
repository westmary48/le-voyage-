import React from 'react';
import './Auth.scss';
import authRequests from '../../helpers/data/authRequests';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    return (
      <div className='Auth'>
        <button className='btn btn-secondary' onClick={this.authenticateUser}>Login with Google
        </button>
      </div>
    );
  }
}

export default Auth;
