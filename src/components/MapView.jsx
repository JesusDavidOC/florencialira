import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

const MapView = ({  stations = [], lines = [], trains = [] }) => {

  const icons = {
    traveling : new L.icon({
        iconUrl: 'https://th.bing.com/th/id/OIP.TXAITsPy94yZ6VaUYSLlmAHaHa?rs=1&pid=ImgDetMain', 
        iconSize: [20, 20], 
        iconAnchor: [12.5, 12.5] 
      }),
      arrival :new L.Icon({
        iconUrl: 'https://th.bing.com/th/id/OIP.TXAITsPy94yZ6VaUYSLlmAHaHa?rs=1&pid=ImgDetMain', 
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      }),
      departing :new L.Icon({
        iconUrl: 'https://icon-library.com/images/train-station-icon/train-station-icon-7.jpg', 
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      }),
      default :new L.Icon({
        iconUrl: 'https://icon-library.com/images/train-station-icon/train-station-icon-7.jpg', 
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
  }


    const stationMarkers = stations.map(station => (
        <Marker
          key={station.station_id}
          position={[station?.position?.lat, station?.position?.long]}
          icon={L.icon({
            iconUrl: 'https://cdn-icons-png.freepik.com/512/10355/10355558.png', 
            iconSize: [20, 20], 
            iconAnchor: [12.5, 12.5] 
          })}
        >
            <Popup>
            Estacion {station.name} ({station.station_id}) <br/>
            Línea {station.line_id}
            </Popup>
        </Marker>
      ));

      const linesPolylines = lines.map(line => {
 
        const linePostions = line.station_ids.map(id => {
            const station = stations.find(s => s.station_id === id)
            return [station?.position?.lat, station?.position?.long]
        })

        return (
            <Polyline key={line.line_id} positions={linePostions} color={line.color} weight={5} />
        )

    
      })

const trainMarkers = trains.map(train => {
    if (train.lat && train.long) { 
      return (
        <Marker
          key={train.train_id}
          position={[train.lat, train.long]} 
          icon={icons[train.status] || icons.default}
        >
          <Popup>
            Tren: {train.train_id} <br />
            Línea: {train.line_id} <br />
            Conductor: {train.driver_name} <br />
            Origen: {train.origin_station_id} <br />
            Destino: {train.destination_station_id}
          </Popup>
        </Marker>
      );
    }
    return null;  // Devolver `null` si no hay datos suficientes
  });
  
  return (
    
    <MapContainer center={[-33.4569, -70.6483]} zoom={13} style={{ height: '50vh', width: '800px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stationMarkers}
      {linesPolylines}
        {trainMarkers}

    </MapContainer>
  );
};

export default MapView;
