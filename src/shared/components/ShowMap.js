import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const ShowMap = (props) => {
  const mapRef = useRef();
  const [lnglat, setLngLat] = useState();

  useEffect(() => {
    setLngLat({ lng: props.longitude, lat: props.latitude });
  }, []);

  if (lnglat) {
    return (
      <div
        style={{ width: '100%', height: '20rem', borderRadius: '20px' }}
        className="mapShow__container"
      >
        <ReactMapGL
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1IjoidW1lcm5pc2FyIiwiYSI6ImNrc3g3bXhpbzE0cWgydXQ3NHlkcGk4dDAifQ.AbnGi15rgLvZOahIz-M9Ww"
          initialViewState={{
            longitude: lnglat.lng,
            latitude: lnglat.lat,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/umernisar/cl8hfkgez000s14mtrtfubdlx"
        >
          <Marker longitude={lnglat.lng} latitude={lnglat.lat} />
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) =>
              setLngLat({
                lng: e.coords.longitude,
                lat: e.coords.latitude,
              })
            }
          />
        </ReactMapGL>
      </div>
    );
  } else return <div>Loading....</div>;
};

export default ShowMap;
