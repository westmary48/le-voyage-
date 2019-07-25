import React from 'react';
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet';
import TripMapCard from '../TripMapCard/TripMapCard';
import tripShape from '../../helpers/propz/tripShape';
import 'leaflet/dist/leaflet.css';

import './MapApplication.scss';

class MapApplication extends React.Component {
    state = {
      trips: [],
      map: {},
    }

    static propTypes = {
      trips: tripShape.tripCardShape,
    }

    setMap = (map) => {
      this.setState({ map });
    }

    componentDidMount() {
      this.map = this.mapInstance.leafletElement;
    }

    render() {
      const { trips } = this.state;
      const makeMap = trips.map(trip => (
      <Marker
        trip={trip}
        key={trip.id}
        position={[trip.y, trip.x]}
      >
      <Popup>
        <TripMapCard trip={trip} />
      </Popup>
      </Marker>
      ));

      return (
      <LeafletMap
        ref={(e) => { this.mapInstance = e; }}
        center={[37.0902, -95.7129]}
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
        {makeMap}
      </LeafletMap>
      );
    }
}

export default MapApplication;
