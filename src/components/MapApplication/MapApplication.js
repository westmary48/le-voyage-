import React from 'react';

import firebase from 'firebase/app';

import 'firebase/auth';

import L from 'leaflet';

import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';
import TripMapCard from '../TripMapCard/TripMapCard';
import tripData from '../../helpers/data/tripData';
// import mapRequests from '../../helpers/data/mapRequests';
import 'leaflet/dist/leaflet.css';

import './MapApplication.scss';

class MapApplication extends React.Component {
    state = {
      trips: [],
      map: {},
    }

    setMap = (map) => {
      this.setState({ map });
    }

    getMyTrips = () => {
      const { uid } = firebase.auth().currentUser;
      tripData.getMyTrips(uid).then((trips) => {
        this.setState({ trips });
      })
        .catch(err => console.error('could not get trips', err));
    }

    componentDidMount() {
      this.map = this.mapInstance.leafletElement;
      this.setMap();
      this.getMyTrips();
    }

    render() {
      const icon = L.icon({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });
      const { trips } = this.state;
      const tripsMarker = trips.map(trip => (
      <Marker
        key={trip.id}
        position={[trip.lat, trip.long]}
        trips = {trips}
        icon = {icon}
      >
      <Popup>
        <TripMapCard trip={trip} />
      </Popup>
      </Marker>
      ));

      return (
      <LeafletMap
        ref={(e) => { this.mapInstance = e; }}
        center={[44.0902, 80.7129]}
        zoom={2.5}
        maxZoom={5}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {tripsMarker}
      </LeafletMap>
      );
    }
}

export default MapApplication;
