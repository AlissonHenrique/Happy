import React, {  useEffect, useState } from 'react';
import mapMarkerImg from '../assets/images/map-marker.svg'
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import '../styles/pages/orphanage-map.css';

import {FiArrowRight} from 'react-icons/fi';
import mapIcon from '../utils/mapIcon';
import api from '../service/api';

interface IOrphanage{
  id:number;
  latitude:number;
  longitude:number;
  name:string;
}

const OrphanagesMap: React.FC = () => {

const [orphanages,setOrphanages]= useState<IOrphanage[]>([])

useEffect(()=>{
    api.get('orphanages').then(response =>{
      setOrphanages(response.data)
      console.log(response.data)
    })
},[])

  return (
   <div id="page-map">
     <aside>
       <header>
         <img src={mapMarkerImg} alt="Happy"/>
         <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão
          esperando a sua visita :)</p>
       </header>
       <footer>
         <strong>Barueri</strong>
         <span>São Paulo</span>
       </footer>
     </aside>

       <Map
       center={[-23.5256076,-46.8737419]}
       zoom={15}
       style={{width:'100%',height:'100%'}}
      >
        {/* <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer
         url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
       {orphanages.map(orphanage =>{
          return (
              <Marker
              position={[orphanage.latitude,orphanage.longitude]}
              icon={mapIcon}
              key={orphanage.id}
              >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                      {orphanage.name}
                      <Link to={`/orphanage/${orphanage.id}`}>
                          <FiArrowRight size={20} color="#fff"/>
                      </Link>
                    </Popup>
              </Marker>
        )
         }
     )}
      </Map>

     <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
     </Link>
   </div>

  )
}

export default OrphanagesMap;
