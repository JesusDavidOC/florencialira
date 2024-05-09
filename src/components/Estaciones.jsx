import React from 'react';

const Estaciones = ({ stations }) => {
  return (
    <div>
      <h2>Estaciones</h2>
      <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Línea</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((estacion) => (
            <tr key={estacion.station_id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{estacion.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{estacion.station_id}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{estacion.line_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estaciones;

