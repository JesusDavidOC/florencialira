import React from 'react';

const Trenes = ({ trains = [], stations = [] }) => {


  return (
    <div>
      <h2>Trenes</h2>
      <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Chofer</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Origen</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Destino</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Estación Actual</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => {
            // Buscar la estación actual del tren
            const currentStation = stations.find(station => 
              Math.abs(station.position.lat - train.lat) < 0.001 && 
              Math.abs(station.position.long - train.long) < 0.001
            );

            return (
              <tr key={train.train_id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{train.train_id}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{train.driver_name}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{train.origin_station_id}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{train.destination_station_id}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{currentStation ? currentStation.station_id : 'En movimiento'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Trenes;



