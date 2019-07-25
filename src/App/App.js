import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import NewTrip from '../components/NewTrip/NewTrip';
import EditTrip from '../components/EditTrip/EditTrip';
import SingleTrip from '../components/SingleTrip/SingleTrip';
import Friends from '../components/Friends/Friends';
import MapApplication from '../components/MapApplication/MapApplication';
import authRequests from '../helpers/data/authRequests';

import './App.scss';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route {...rest} render = {props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
  );
  return <Route {...rest} render = {props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    fbConnection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, pendingUser } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
       <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} logoutClickEvent={logoutClickEvent}/>
            <div className='container'>
              <div className="row">
                <Switch>
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/new' component={NewTrip} authed={authed}/>
                  <PrivateRoute path='/edit/:id' component={EditTrip} authed={authed}/>
                  <PrivateRoute path='/trip/:id' component={SingleTrip} authed={authed}/>
                  <PrivateRoute path='/friends' component={Friends} authed={this.state.authed}/>
                  <PrivateRoute path='/map' component={MapApplication} authed={this.state.authed}/>
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />

                  <Redirect from="*" to="/auth" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
