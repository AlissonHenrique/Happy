import Leaflet from 'leaflet';
import mapMarkerImg from '../assets/images/map-marker.svg';


const mapIcon2 = Leaflet.icon({
  iconUrl:mapMarkerImg,
  iconSize:[58,68],
  iconAnchor:[29,68],
  popupAnchor:[170,2],
})

export default mapIcon2;
