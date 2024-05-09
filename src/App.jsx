import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MapView from './components/MapView';
import Chat from './components/Chat';
import Estaciones from './components/Estaciones';
import Trenes from './components/Trenes';
import axios from 'axios';

function App() {
  const [stations, setStations] = useState([]);
  const [lines, setLines] = useState([]);
  const [trains, setTrains] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); // Variable de estado para almacenar el socket WebSocket

  useEffect(() => {
    const newSocket = new WebSocket('wss://tarea-2.2024-1.tallerdeintegracion.cl/connect');

    // Abrir la conexión y enviar el evento JOIN
    newSocket.onopen = () => {
      console.log('WebSocket connection open');
      newSocket.send(JSON.stringify({
        type: "JOIN",
        payload: {
          id: "19625987", // Sustituir con tu número real de alumno
          username: "florencialira" // Opcional
        }
      }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'position':
          setTrains(trains => trains.map(train =>
            train.train_id === data.data.train_id ? { ...train, ...data.data.position } : train
          ));
          break;

        case 'status' :
          setTrains(trains => trains.map(train =>
            train.train_id === data.data.train_id ? { ...train, status: data.data.status } : train
          ));
       
          break;

        case 'arrival':
          setTrains(trains => trains.map(train => {
            if (train.train_id === data.data.train_id) {
              const updatedTrain = { ...train, current_station_id: data.data.station_id };
              return 'current_station_id' in train ? updatedTrain : { ...updatedTrain, current_station_id: data.data.station_id };
            }
            return train;
          }));
          break;

        case 'departure':
          setTrains(trains => trains.map(train => {
            if (train.train_id === data.data.train_id) {
              return 'current_station_id' in train ? { ...train, current_station_id: null } : train;
            }
            return train;
          }));
          break;

        case 'message':
       
          setMessages(messages => [...messages, {...data.data, timestamp: data.timestamp}]);
          break;

        default:
          break;
      }
    };

    newSocket.onerror = (error) => {
      console.log("WebSocket Error", error);
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket Closed", event.reason);
    };

    // Guardar el socket en la variable de estado
    setSocket(newSocket);

    return () => {
      newSocket.close()
    }
  }, []); // Este arreglo vacío asegura que este efecto se ejecute solo una vez, al montar el componente

  useEffect(() => {
    const fetchData = async () => {
      const stationResponse = await axios.get('https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/stations');
      const linesResponse = await axios.get('https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/lines');
      const trainResponse = await axios.get('https://tarea-2.2024-1.tallerdeintegracion.cl/api/metro/trains');

      setStations(stationResponse.data);
      setLines(linesResponse.data);
      setTrains(trainResponse.data);
    };

    fetchData();
  }, []);

  const sendMessage = (message) => {
    console.log('Enviando mensaje:', message);
    // Verificar si el socket está definido antes de enviar el mensaje
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: "MESSAGE",
        payload: {
          content: message
        }
      }));
  
      // Cerrar el socket después de enviar el mensaje
      // No cierres el socket aquí si esperas recibir mensajes entrantes
      // socket.close();
    } else {
      console.log('Error: El socket no está disponible o no está abierto.');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gridTemplateColumns: '1fr 1fr', height: '100vh' }}>
      <div style={{ gridRow: '1 / span 1', gridColumn: '1 / span 1' }}>
        <h1>METRAPI</h1>
        <MapView stations={stations} lines={lines} trains={trains} />
      </div>
      <div style={{ gridRow: '1 / span 1', gridColumn: '2 / span 1' }}>
        <Chat  messages={messages} sendMessage={sendMessage} />
      </div>
      <div style={{ gridRow: '2 / span 1', gridColumn: '1 / span 1' }}>
        <Estaciones stations={stations} />
      </div>
      <div style={{ gridRow: '2 / span 1', gridColumn: '2 / span 1' }}>
        <Trenes trains={trains} stations={stations} />
      </div>
    </div>
  );
}

export default App;

