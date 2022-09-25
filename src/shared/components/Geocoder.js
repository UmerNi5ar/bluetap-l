import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = (props) => {
  const ctrl = new MapBoxGeocoder({
    accessToken:
      'pk.eyJ1IjoidW1lcm5pc2FyIiwiYSI6ImNrc3g3bXhpbzE0cWgydXQ3NHlkcGk4dDAifQ.AbnGi15rgLvZOahIz-M9Ww',
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    console.log('baout close');
    const coords = e.result.geometry.coordinates;
    props.setLngLat({ lng: coords[0], lat: coords[1] });
  });
  return null;
};

export default Geocoder;
