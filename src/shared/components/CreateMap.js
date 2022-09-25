import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';

import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import Geocoder from './Geocoder';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const CreateMap = (props) => {
  const mapRef = useRef();
  // const [props.lnglat, props.setLngLat] = useState();

  const getLoc = () => {
    if (!props.lnglat) {
      const response = axios
        .get(
          'https://geolocation-db.com/json/0bf34a90-393f-11ed-92e1-11df89e55a41'
        )
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          // mapRef.current.flyTo({
          //   center: [data.longitude, data.latitude],
          // });
          props.setLngLat({
            lng: data.longitude,
            lat: data.latitude,
          });
        });
    }
  };
  useEffect(() => {
    getLoc();
  }, []);

  if (props.lnglat)
    return (
      <div
        style={{ width: '100%', height: '20rem', borderRadius: '20px' }}
        className="mapShow__container"
      >
        <ReactMapGL
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1IjoidW1lcm5pc2FyIiwiYSI6ImNrc3g3bXhpbzE0cWgydXQ3NHlkcGk4dDAifQ.AbnGi15rgLvZOahIz-M9Ww"
          initialViewState={{
            longitude: props.lnglat.lng,
            latitude: props.lnglat.lat,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/umernisar/cl8hfkgez000s14mtrtfubdlx"
        >
          <Marker
            longitude={props.lnglat.lng}
            latitude={props.lnglat.lat}
            draggable
            onDragEnd={(e) =>
              props.setLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat })
            }
          />
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) =>
              props.setLngLat({
                lng: e.coords.longitude,
                lat: e.coords.latitude,
              })
            }
          />
          <Geocoder setLngLat={props.setLngLat} />
        </ReactMapGL>
      </div>
    );
  else return <div>Loading....</div>;
};

export default CreateMap;
